# Project Rules (AGENTS.md)

## Supabase Table Creation & Access Guidelines

When creating or accessing Supabase PostgreSQL tables via SQL or migrations, always apply the following rules:

### 1. Explicit `GRANT` Statements for PostgREST API Access
- Always include explicit `GRANT` SQL statements so that the `anon` and `authenticated` roles can access the table (and any associated sequences) through the PostgREST API.
- Explicitly grant required privileges (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) on each newly created table.

### 2. Mandatory Row Level Security (RLS) & `authenticated`-Only Policies
- Always enable Row Level Security (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`) on every table.
- Always define RLS `POLICY` rules so that **only `authenticated` users** can read and write rows (e.g., `TO authenticated` with appropriate `USING` and `WITH CHECK` conditions, scoping to `auth.uid()` for user-owned records where applicable).

### Reference SQL Template

```sql
-- 1. Create table
CREATE TABLE IF NOT EXISTS public.<table_name> (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Explicit GRANTs for PostgREST API access (anon & authenticated)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.<table_name> TO anon, authenticated;
-- If using SERIAL / IDENTITY sequences, also grant sequence privileges:
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;

-- 4. Policies: allow read/write only for authenticated users
CREATE POLICY "Authenticated users can select"
  ON public.<table_name>
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert"
  ON public.<table_name>
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update"
  ON public.<table_name>
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete"
  ON public.<table_name>
  FOR DELETE
  TO authenticated
  USING (true);
```

> Note: When a table stores user-specific data (`user_id`), narrow the `USING` and `WITH CHECK` expressions to `auth.uid() = user_id` as appropriate.
