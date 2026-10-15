# LARECS Academic Platform

React + Vite Arabic RTL academic laboratory platform.

## Run
```bash
npm install
npm run dev
```

## GitHub
```bash
git init
git add .
git commit -m "Initial LARECS platform"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## Database setup (Supabase)
1. Open Supabase Dashboard → SQL Editor and run `supabase/migrations/001_auth_roles_items.sql`, then `supabase/migrations/002_file_uploads.sql` (creates the public `files` storage bucket for PDF / Word attachments, 2 MB max).
2. Create your account from the site's **دخول → إنشاء حساب** page.
3. Every account created from the site is a `user`. To make someone an admin, go to
   Supabase Dashboard → **Table Editor → profiles**, and change their `role` to `admin`.
   This is the only way: role changes from the website are blocked by the database, even for admins.

## Permissions (enforced by Row Level Security)
| Action | Visitor | User | Admin |
|---|---|---|---|
| Read content | ✅ | ✅ | ✅ |
| Create items | ❌ | ✅ | ✅ |
| Edit / delete own items | — | ✅ | ✅ |
| Edit / delete anyone's items | ❌ | ❌ | ✅ |
| Edit about / vision texts | ❌ | ❌ | ✅ |
| Change user roles | ❌ | ❌ | ❌ (Supabase dashboard only) |

Tables: `profiles` (one per user, `role` = `user` | `admin`), `items` (all list content, `owner_id` = creator), `site_content` (about / vision texts).

Never commit secrets to GitHub.
