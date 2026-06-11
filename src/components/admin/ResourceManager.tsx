import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  type ResourceConfig,
  type AnyRow,
  listRows,
  upsertRow,
  deleteRow,
  slugify,
} from "@/lib/cms";

function blankForm(config: ResourceConfig): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  config.fields.forEach((f) => {
    if (f.type === "checkbox") obj[f.name] = false;
    else if (f.type === "number") obj[f.name] = 0;
    else if (f.type === "tags") obj[f.name] = "";
    else if (f.type === "select") obj[f.name] = f.options?.[0] ?? "";
    else obj[f.name] = "";
  });
  return obj;
}

function rowToForm(config: ResourceConfig, row: Record<string, unknown>): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  config.fields.forEach((f) => {
    const v = row[f.name];
    if (f.type === "tags") obj[f.name] = Array.isArray(v) ? v.join(", ") : "";
    else obj[f.name] = v ?? (f.type === "checkbox" ? false : f.type === "number" ? 0 : "");
  });
  return obj;
}

function formToValues(config: ResourceConfig, form: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  config.fields.forEach((f) => {
    const v = form[f.name];
    if (f.type === "tags") {
      out[f.name] = String(v || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (f.type === "number") {
      out[f.name] = Number(v) || 0;
    } else if (f.type === "checkbox") {
      out[f.name] = !!v;
    } else {
      out[f.name] = v === "" ? null : v;
    }
  });
  return out;
}

export function ResourceManager({ config }: { config: ResourceConfig }) {
  const qc = useQueryClient();
  const queryKey = ["cms", config.table];
  const { data: rows, isLoading } = useQuery({ queryKey, queryFn: () => listRows(config.table) });

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(blankForm(config));

  const saveMutation = useMutation({
    mutationFn: () => upsertRow(config.table, formToValues(config, form), editId ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey });
      toast.success(`${config.singular} saved`);
      setOpen(false);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow(config.table, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey });
      toast.success(`${config.singular} deleted`);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  function openCreate() {
    setEditId(null);
    setForm(blankForm(config));
    setOpen(true);
  }
  function openEdit(row: AnyRow) {
    setEditId((row as { id: string }).id);
    setForm(rowToForm(config, row as Record<string, unknown>));
    setOpen(true);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{config.label}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows?.length ?? 0} {config.label.toLowerCase()}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-brand-bright hover:shadow-glow"
        >
          <Plus className="h-4 w-4" /> New {config.singular}
        </button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : rows && rows.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border">
          {rows.map((row) => {
            const r = row as Record<string, unknown>;
            return (
              <div
                key={String(r.id)}
                className="flex items-center justify-between gap-4 border-b border-border bg-surface px-5 py-4 last:border-0"
              >
                <div className="min-w-0">
                  <p className="truncate font-display font-semibold">{String(r[config.titleField])}</p>
                  {config.subtitleField && (
                    <p className="truncate text-sm text-muted-foreground">
                      {String(r[config.subtitleField] ?? "")}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => openEdit(row)}
                    className="rounded-md border border-border p-2 transition-colors hover:border-brand-bright hover:bg-elevated"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete this ${config.singular.toLowerCase()}?`))
                        deleteMutation.mutate(String(r.id));
                    }}
                    className="rounded-md border border-border p-2 text-destructive transition-colors hover:border-destructive hover:bg-destructive/10"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center text-muted-foreground">
          No {config.label.toLowerCase()} yet. Create your first one.
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-card">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editId ? "Edit" : "New"} {config.singular}
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate();
              }}
            >
              {config.fields.map((f) => (
                <div key={f.name}>
                  {f.type !== "checkbox" && (
                    <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
                  )}
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={String(form[f.name] ?? "")}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-bright focus:ring-2 focus:ring-ring/40"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={String(form[f.name] ?? "")}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-bright"
                    >
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={!!form[f.name]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                        className="h-4 w-4 accent-[oklch(0.62_0.19_257)]"
                      />
                      {f.label}
                    </label>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      required={f.required}
                      value={String(form[f.name] ?? "")}
                      onChange={(e) => {
                        const next = { ...form, [f.name]: e.target.value };
                        if (f.name === config.titleField && !editId && !form.slug) {
                          next.slug = slugify(e.target.value);
                        }
                        setForm(next);
                      }}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-bright focus:ring-2 focus:ring-ring/40"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-elevated"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-bright disabled:opacity-60"
                >
                  {saveMutation.isPending ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
