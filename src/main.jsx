import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { createRoot } from "react-dom/client";
import {
  Search,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  Upload,
  LogIn,
  LogOut,
  BookOpen,
  Users,
  FlaskConical,
  CalendarDays,
  FileText,
  Mail,
  UserCircle,
  ShieldCheck,
  Download,
} from "lucide-react";
import "./styles.css";
const seed = {
  about: {
    title: "التعريف بالمختبر",
    text: "مختبر LARECS يُشكّل مختبر الأبحاث والدراسات الثقافية والاجتماعية فضاءً أكاديميًا يُعنى بإنتاج المعرفة العلمية في مجال علم الأديان ومقارنتها، ودراسة الظواهر الدينية في أبعادها التاريخية والاجتماعية والثقافية والفكرية، وفق مقاربات علمية ونقدية تستهدف فهم الأديان ومعتقداتها وممارساتها وسياقات نشأتها وتطوّرها.ويركّز المختبر على دراسة الأديان من منظور علمي ومقارن، من خلال تحليل النصوص الدينية، والعقائد، والطقوس، والتمثّلات، وأنماط التدين، مع استكشاف أوجه التشابه والاختلاف بين التقاليد الدينية، وتتبع تطورها التاريخي وتفاعلاتها مع السياقات الاجتماعية والثقافية والحضارية. كما يهتم بدراسة العلاقة بين الدين والمجتمع، وأدوار المؤسسات والفاعلين الدينيين، وقضايا التعدد الديني والحوار بين الأديان.ويعتمد المختبر مقاربة متعددة التخصصات، تستفيد من علم الأديان المقارن، وعلم الاجتماع الديني، والأنثروبولوجيا، والتاريخ، والفلسفة، والدراسات الثقافية، بما يتيح مقاربة الظواهر الدينية في تعدّد أبعادها وتجلياتها. كما يعمل على تطوير مشاريع بحثية تستند إلى أسس نظرية ومنهجية واضحة، وتُعنى بدراسة الأديان ومقارنتها ضمن سياقاتها التاريخية والحضارية، مع مراعاة خصوصيات كل تقليد ديني وتجنب الأحكام المسبقة والمقاربات الاختزالية.وفي إطار رسالته الأكاديمية، يساهم المختبر في تكوين الباحثين وتأهيلهم، ولا سيما طلبة الدكتوراه، من خلال التأطير العلمي، وتنظيم اللقاءات والندوات الأكاديمية، وتشجيع النقاش العلمي، وتنمية مهارات البحث الميداني، وتحليل النصوص والمصادر الدينية والتاريخية، وتوظيف المناهج المقارنة في البحث العلمي.ومن خلال أنشطته العلمية وبرامجه البحثية، يسعى المختبر إلى الإسهام في تطوير البحث في مجال علم الأديان ومقارنتها، وتعميق فهم التنوع الديني وتاريخ التفاعلات بين الأديان، وإغناء النقاش الأكاديمي حول قضايا التعدد الديني، والحوار بين الأديان، والتعايش، والهوية، ومكانة الدين في المجتمعات المعاصرة.",
  },
  vision: {
    title: "الرؤية والأهداف",
    text: "يُشكّل مختبر الأبحاث والدراسات الثقافية والاجتماعية فضاءً أكاديميًا يُعنى بإنتاج المعرفة العلمية في مجال علم الأديان ومقارنتها، ودراسة الظواهر الدينية في أبعادها التاريخية والاجتماعية والثقافية والفكرية، وفق مقاربات علمية ونقدية تستهدف فهم الأديان ومعتقداتها وممارساتها وسياقات نشأتها وتطوّرها.ويركّز المختبر على دراسة الأديان من منظور علمي ومقارن، من خلال تحليل النصوص الدينية، والعقائد، والطقوس، والتمثّلات، وأنماط التدين، مع استكشاف أوجه التشابه والاختلاف بين التقاليد الدينية، وتتبع تطورها التاريخي وتفاعلاتها مع السياقات الاجتماعية والثقافية والحضارية. كما يهتم بدراسة العلاقة بين الدين والمجتمع، وأدوار المؤسسات والفاعلين الدينيين، وقضايا التعدد الديني والحوار بين الأديان.ويعتمد المختبر مقاربة متعددة التخصصات، تستفيد من علم الأديان المقارن، وعلم الاجتماع الديني، والأنثروبولوجيا، والتاريخ، والفلسفة، والدراسات الثقافية، بما يتيح مقاربة الظواهر الدينية في تعدّد أبعادها وتجلياتها. كما يعمل على تطوير مشاريع بحثية تستند إلى أسس نظرية ومنهجية واضحة، وتُعنى بدراسة الأديان ومقارنتها ضمن سياقاتها التاريخية والحضارية، مع مراعاة خصوصيات كل تقليد ديني وتجنب الأحكام المسبقة والمقاربات الاختزالية.وفي إطار رسالته الأكاديمية، يساهم المختبر في تكوين الباحثين وتأهيلهم، ولا سيما طلبة الدكتوراه، من خلال التأطير العلمي، وتنظيم اللقاءات والندوات الأكاديمية، وتشجيع النقاش العلمي، وتنمية مهارات البحث الميداني، وتحليل النصوص والمصادر الدينية والتاريخية، وتوظيف المناهج المقارنة في البحث العلمي.ومن خلال أنشطته العلمية وبرامجه البحثية، يسعى المختبر إلى الإسهام في تطوير البحث في مجال علم الأديان ومقارنتها، وتعميق فهم التنوع الديني وتاريخ التفاعلات بين الأديان، وإغناء النقاش الأكاديمي حول قضايا التعدد الديني، والحوار بين الأديان، والتعايش، والهوية، ومكانة الدين في المجتمعات المعاصرة.",
  },
};
const labels = {
  home: "الرئيسية",
  about: "التعريف بالمختبر",
  vision: "الرؤية والأهداف",
  members: "أعضاء المختبر",
  teams: "فرق البحث",
  articles: "المقالات",
  books: "الكتب",
  theses: "الأطروحات والرسائل",
  reports: "التقارير",
  phd: "طلبة الدكتوراه",
  researchers: "الأساتذة والباحثون",
  seminars: "الندوات",
  conferences: "المؤتمرات",
  studyDays: "الأيام الدراسية",
  defenses: "المناقشات",
  newsletters: "النشرة العلمية",
  library: "المكتبة الرقمية",
  documents: "الوثائق والموارد",
  contact: "اتصل بنا",
  search: "البحث داخل المنصة",
  login: "الحساب",
};
const groups = [
  ["المختبر", ["about", "vision", "members", "teams"]],
  ["الأبحاث والمنشورات", ["articles", "books", "theses", "reports"]],
  ["الطلبة والباحثون", ["phd", "researchers"]],
  ["الأنشطة العلمية", ["seminars", "conferences", "studyDays", "defenses"]],
];
const fields = [
  "title",
  "author",
  "year",
  "event_date",
  "location",
  "item_type",
  "description",
  "email",
  "file_name",
  "file_path",
];
const blank = {
  title: "",
  author: "",
  year: "",
  event_date: "",
  location: "",
  item_type: "",
  description: "",
  email: "",
  file_name: "",
  file_path: "",
};
const maxFileSize = 2 * 1024 * 1024;
const allowedExt = ["pdf", "doc", "docx"];
const fileUrl = (path, download) =>
  supabase.storage
    .from("files")
    .getPublicUrl(path, download ? { download } : undefined).data.publicUrl;
const removeFile = (path) =>
  path &&
  supabase.storage
    .from("files")
    .remove([path])
    .then(({ error }) => error && console.error(error));

function App() {
  const [content, setContent] = useState(seed);
  const [items, setItems] = useState([]);
  const [p, setP] = useState("home");
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const [textModal, setTextModal] = useState(null);
  const [message, setMessage] = useState("");

  const user = session?.user ?? null;
  const admin = profile?.role === "admin";
  const canEdit = (item) => admin || (!!user && item.owner_id === user.id);

  // Vérifier la session Supabase
  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) console.error(error);
      setSession(data?.session ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) setSession(nextSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Charger le profil (et le rôle) de l'utilisateur connecté
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    let active = true;

    supabase
      .from("profiles")
      .select("id, email, full_name, role")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.error(error);
        setProfile(data ?? null);
      });

    return () => {
      active = false;
    };
  }, [user?.id]);

  // Charger le contenu depuis Supabase
  useEffect(() => {
    let active = true;

    async function fetchContent() {
      const [siteRes, itemsRes] = await Promise.all([
        supabase
          .from("site_content")
          .select("content")
          .eq("id", 1)
          .maybeSingle(),
        supabase
          .from("items")
          .select("*")
          .order("created_at", { ascending: true }),
      ]);

      if (!active) return;

      if (siteRes.error || itemsRes.error) {
        console.error(siteRes.error || itemsRes.error);
        setMessage("تعذر تحميل المحتوى من قاعدة البيانات. تحقق من الاتصال.");
      }

      if (siteRes.data?.content) {
        setContent({ ...seed, ...siteRes.data.content });
      }

      setItems(itemsRes.data ?? []);
    }

    fetchContent();

    return () => {
      active = false;
    };
  }, []);

  const nav = (x) => {
    setP(x);
    setMenu(false);
    window.scrollTo(0, 0);
  };

  const add = (section) => {
    if (!user) return nav("login");
    setModal({ section, item: null, x: { ...blank } });
  };

  const edit = (item) => {
    const x = {};
    fields.forEach((f) => (x[f] = item[f] ?? ""));
    setModal({ section: item.section, item, x });
  };

  const del = async (item) => {
    if (!window.confirm("هل تريد حذف هذا العنصر؟")) return;

    const { error } = await supabase.from("items").delete().eq("id", item.id);

    if (error) {
      console.error(error);
      setMessage("تعذر حذف العنصر. ليست لديك الصلاحية.");
      return;
    }

    removeFile(item.file_path);
    setItems((v) => v.filter((i) => i.id !== item.id));
  };

  const saveItem = async (m) => {
    const row = {};
    fields.forEach((f) => (row[f] = m.x[f]?.toString().trim() || null));

    if (!row.title) return "العنوان / الاسم مطلوب.";

    // Uploader le nouveau fichier avant d'enregistrer l'élément
    if (m.file) {
      const ext = m.file.name.split(".").pop().toLowerCase();
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(path, m.file, { contentType: m.file.type });

      if (uploadError) {
        console.error(uploadError);
        return "تعذر رفع الملف. تحقق من نوعه وحجمه (2 ميغابايت كحد أقصى).";
      }

      row.file_path = path;
      row.file_name = m.file.name;
    }

    const { data, error } = m.item
      ? await supabase
          .from("items")
          .update(row)
          .eq("id", m.item.id)
          .select()
          .maybeSingle()
      : await supabase
          .from("items")
          .insert({ ...row, section: m.section })
          .select()
          .maybeSingle();

    if (error || !data) {
      console.error(error);
      if (m.file) removeFile(row.file_path);
      return "تعذر حفظ العنصر. تحقق من صلاحياتك.";
    }

    // Supprimer l'ancien fichier s'il a été remplacé ou retiré
    if (m.item?.file_path && m.item.file_path !== data.file_path) {
      removeFile(m.item.file_path);
    }

    setItems((v) =>
      m.item ? v.map((i) => (i.id === data.id ? data : i)) : [...v, data],
    );
    setModal(null);
    setMessage("");
    return null;
  };

  const saveText = async (key, value) => {
    const next = { ...content, [key]: value };

    const { data, error } = await supabase
      .from("site_content")
      .update({ content: next, updated_at: new Date().toISOString() })
      .eq("id", 1)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      console.error(error);
      return "تعذر حفظ المحتوى. تحقق من صلاحيات المدير.";
    }

    setContent(next);
    setTextModal(null);
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setMessage("");
    nav("home");
  };

  return (
    <>
      <header>
        <div className="bar">
          <button className="brand" onClick={() => nav("home")}>
            <b>L</b>
            <span>
              <strong>LARECS</strong>
              <small>مختبر الدراسات العليا/علم مقارنة الأديان</small>
            </span>
          </button>

          <nav className={menu ? "open" : ""}>
            <button onClick={() => nav("home")}>الرئيسية</button>
            {groups.map(([g, s]) => (
              <button key={g} onClick={() => nav(s[0])}>
                {g}
              </button>
            ))}
            <button onClick={() => nav("library")}>المكتبة الرقمية</button>
            <button onClick={() => nav("documents")}>الوثائق والموارد</button>
            <button onClick={() => nav("contact")}>اتصل بنا</button>
          </nav>

          <div className="actions">
            <button className="ico" onClick={() => nav("search")}>
              <Search size={18} />
            </button>

            {user ? (
              <>
                <span className="userchip" title={user.email}>
                  {admin ? <ShieldCheck size={15} /> : <UserCircle size={15} />}
                  {profile?.full_name || user.email}
                </span>
                <button className="admin" onClick={logout}>
                  <LogOut size={16} /> خروج
                </button>
              </>
            ) : (
              <button className="admin" onClick={() => nav("login")}>
                <LogIn size={16} /> دخول
              </button>
            )}

            <button className="ico mobile" onClick={() => setMenu(!menu)}>
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {(user || message) && (
        <div className="adminbar">
          {message ||
            (admin
              ? "وضع الإدارة — يمكنك إضافة وتعديل وحذف جميع المحتويات."
              : "يمكنك إضافة محتوى جديد، وتعديل أو حذف ما أضفته أنت فقط.")}
        </div>
      )}

      {p === "home" ? (
        <Home nav={nav} d={content} />
      ) : p === "search" ? (
        <SearchPage items={items} q={q} setQ={setQ} nav={nav} />
      ) : p === "contact" ? (
        <Contact />
      ) : p === "login" ? (
        <AuthPage user={user} profile={profile} nav={nav} />
      ) : (
        <Content
          p={p}
          d={content}
          items={items.filter((i) => i.section === p)}
          user={user}
          admin={admin}
          canEdit={canEdit}
          add={add}
          edit={edit}
          del={del}
          editText={(key) => setTextModal({ key, x: { ...content[key] } })}
        />
      )}

      {modal && (
        <Editor m={modal} close={() => setModal(null)} save={saveItem} />
      )}

      {textModal && (
        <TextEditor
          m={textModal}
          close={() => setTextModal(null)}
          save={saveText}
        />
      )}

      <footer>
        <b>LARECS</b>
        <span>©️ {new Date().getFullYear()} جميع الحقوق محفوظة</span>
      </footer>
    </>
  );
}

function AuthPage({ user, profile, nav }) {
  const [mode, setMode] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    return (
      <main className="page auth">
        <div className="panel">
          <h2>مرحباً {profile?.full_name || user.email}</h2>
          <p>
            أنت مسجل الدخول بصفة{" "}
            <b>{profile?.role === "admin" ? "مدير" : "مستخدم"}</b>.
          </p>
          <button className="primary" onClick={() => nav("home")}>
            العودة إلى الرئيسية
          </button>
        </div>
      </main>
    );
  }

  const switchMode = (m) => {
    setMode(m);
    setError("");
    setNotice("");
  };

  async function submit(e) {
    e.preventDefault();
    setError("");
    setNotice("");

    if (mode === "signup") {
      if (password.length < 6)
        return setError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
      if (password !== confirm) return setError("كلمتا المرور غير متطابقتين.");
    }

    setBusy(true);

    if (mode === "signin") {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      setBusy(false);

      if (authError) {
        setError("تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.");
        return;
      }

      nav("home");
      return;
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: fullName.trim() } },
    });

    setBusy(false);

    if (authError) {
      setError(
        authError.message?.toLowerCase().includes("registered")
          ? "هذا البريد مسجل مسبقاً."
          : "تعذر إنشاء الحساب. حاول مرة أخرى.",
      );
      return;
    }

    if (!data.session) {
      switchMode("signin");
      setNotice(
        "تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل الدخول.",
      );
      return;
    }

    nav("home");
  }

  return (
    <main className="page auth">
      <div className="panel">
        <div className="tabs">
          <button
            type="button"
            className={mode === "signin" ? "on" : ""}
            onClick={() => switchMode("signin")}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            className={mode === "signup" ? "on" : ""}
            onClick={() => switchMode("signup")}
          >
            إنشاء حساب
          </button>
        </div>

        <form className="form" onSubmit={submit}>
          {mode === "signup" && (
            <label>
              الاسم الكامل
              <input
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>
          )}

          <label>
            البريد الإلكتروني
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            كلمة المرور
            <input
              type="password"
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {mode === "signup" && (
            <label>
              تأكيد كلمة المرور
              <input
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </label>
          )}

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="notice" role="status">
              {notice}
            </p>
          )}

          <button className="primary" type="submit" disabled={busy}>
            {busy
              ? "جارٍ المعالجة..."
              : mode === "signin"
                ? "دخول"
                : "إنشاء الحساب"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Home({ nav, d }) {
  return (
    <main>
      <section className="hero">
        <div>
          <small>منصة أكاديمية للبحث العلمي</small>
          <h1>
            منصة مختبر <em>LARECS</em>
            <br />
            للدراسات العليا
          </h1>
          <p>
            حيث تتحوّل الأسئلة البحثية إلى معرفة موثّقة، ونبني جسوراً بين
            الباحثين والطلبة والمجتمع.
          </p>
          <div className="buttons">
            <button className="primary" onClick={() => nav("about")}>
              اكتشف المختبر
            </button>
            <button className="secondary" onClick={() => nav("articles")}>
              الأبحاث والمنشورات
            </button>
          </div>
        </div>
      </section>
      <section className="stats">
        <Stat i={<FlaskConical />} n="04" t="مجالات البحث" />
        <Stat i={<Users />} n="+30" t="باحثاً وعضواً" />
        <Stat i={<BookOpen />} n="+100" t="منشوراً وبحثاً" />
        <Stat i={<CalendarDays />} n="2019" t="سنة التأسيس" />
      </section>
      <section className="intro">
        <div>
          <small>عن المختبر</small>
          <h2>{d.about.title}</h2>
          <p>{d.about.text}</p>
          <button className="link" onClick={() => nav("about")}>
            المزيد عن المختبر ←
          </button>
        </div>
        <blockquote>
          « البحث العلمي ليس فقط إنتاج المعرفة، بل تحويلها إلى أثر.»
        </blockquote>
      </section>
      <section className="discover">
        <small>استكشف المنصة</small>
        <h2>كل ما تحتاجه في فضاء واحد</h2>
        <div className="cards">
          <Card
            i={<FileText />}
            t="الأبحاث والمنشورات"
            p="المقالات والكتب والأطروحات والتقارير."
            f={() => nav("articles")}
          />
          <Card
            i={<Users />}
            t="الباحثون والطلبة"
            p="تعرف على أعضاء المختبر وطلبة الدكتوراه."
            f={() => nav("members")}
          />
          <Card
            i={<CalendarDays />}
            t="الأنشطة العلمية"
            p="الندوات والمؤتمرات والأيام الدراسية."
            f={() => nav("seminars")}
          />
        </div>
      </section>
    </main>
  );
}
const Stat = ({ i, n, t }) => (
  <div className="stat">
    {i}
    <strong>{n}</strong>
    <span>{t}</span>
  </div>
);
const Card = ({ i, t, p, f }) => (
  <button className="card" onClick={f}>
    {i}
    <h3>{t}</h3>
    <p>{p}</p>
    <b>استكشف ←</b>
  </button>
);
function Content({
  p,
  d,
  items,
  user,
  admin,
  canEdit,
  add,
  edit,
  del,
  editText,
}) {
  let special = p === "about" || p === "vision";
  return (
    <main className="page">
      <div className="pagehead">
        <div>
          <small>LARECS / {labels[p]}</small>
          <h1>{labels[p]}</h1>
        </div>
        {!special && (
          <button className="primary small" onClick={() => add(p)}>
            {user ? (
              <>
                <Plus size={16} /> إضافة
              </>
            ) : (
              <>
                <LogIn size={16} /> سجّل الدخول للإضافة
              </>
            )}
          </button>
        )}
        {special && admin && (
          <button className="primary small" onClick={() => editText(p)}>
            <Pencil size={16} /> تعديل
          </button>
        )}
      </div>
      {special ? (
        <div className="panel">
          <h2>{d[p].title}</h2>
          <p>{d[p].text}</p>
        </div>
      ) : (
        <div className="items">
          {items.map((x) => (
            <article className="item" key={x.id}>
              <div>
                <label>{x.item_type || labels[p]}</label>
                {user && x.owner_id === user.id && (
                  <label className="mine">أضفته أنت</label>
                )}
                <h2>{x.title}</h2>
                <p>{x.description || ""}</p>
                <small>
                  {x.author && "✦ " + x.author} {x.year && " · " + x.year}{" "}
                  {x.event_date && " · " + x.event_date}{" "}
                  {x.location && " · " + x.location}{" "}
                  {x.email && " · " + x.email}
                </small>
                {x.file_path && (
                  <div className="files">
                    <a
                      href={fileUrl(x.file_path)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText size={14} /> قراءة {x.file_name}
                    </a>
                    <a href={fileUrl(x.file_path, x.file_name || true)}>
                      <Download size={14} /> تحميل
                    </a>
                  </div>
                )}
              </div>
              {canEdit(x) && (
                <aside>
                  <button onClick={() => edit(x)}>
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => del(x)}>
                    <Trash2 size={15} />
                  </button>
                </aside>
              )}
            </article>
          ))}
          {!items.length && <div className="panel">لا توجد عناصر بعد.</div>}
          {user && (
            <button className="empty" onClick={() => add(p)}>
              <Plus /> إضافة عنصر جديد
            </button>
          )}
        </div>
      )}
    </main>
  );
}
function SearchPage({ items, q, setQ, nav }) {
  let r = q
    ? items.filter((x) =>
        fields
          .map((f) => x[f] || "")
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase()),
      )
    : [];
  return (
    <main className="page">
      <div className="pagehead">
        <div>
          <small>LARECS / بحث</small>
          <h1>البحث داخل المنصة</h1>
        </div>
      </div>
      <div className="search">
        <Search />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث عن مقال، باحث، مؤتمر..."
        />
      </div>
      <div className="results">
        {r.map((x) => (
          <button key={x.id} onClick={() => nav(x.section)}>
            <small>{labels[x.section]}</small>
            <b>{x.title}</b>
          </button>
        ))}
        {q && !r.length && (
          <div className="panel">لم يتم العثور على نتائج.</div>
        )}
      </div>
    </main>
  );
}
function Contact() {
  return (
    <main className="page">
      <div className="pagehead">
        <div>
          <small>LARECS / تواصل</small>
          <h1>اتصل بنا</h1>
        </div>
      </div>
      <div className="contact">
        <div className="panel">
          <h2>تواصل مع المختبر</h2>
          <p>
            للاستفسارات العلمية والشراكات والأنشطة، يمكنكم التواصل معنا عبر
            القنوات الرسمية.
          </p>
          <p>
            <Mail /> dkhiri.abdelhay2@gmail.com
          </p>
          <p>📍 المؤسسة /كلية الآداب والعلوم الإنسانية سايس - فاس (جامعة سيدي محمد بن عبد الله)</p>
        </div>
        <form
          className="panel form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("تم إرسال الرسالة (نموذج تجريبي).");
          }}
        >
          <input placeholder="الاسم الكامل" required />
          <input type="email" placeholder="البريد الإلكتروني" required />
          <textarea rows="6" placeholder="رسالتك" required />
          <button className="primary">إرسال الرسالة</button>
        </form>
      </div>
    </main>
  );
}
function Editor({ m, close, save }) {
  const [x, setX] = useState(m.x);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  let put = (k, v) => setX({ ...x, [k]: v });
  let pick = (f) => {
    if (f && !allowedExt.includes(f.name.split(".").pop().toLowerCase())) {
      setErr("يُسمح فقط بملفات PDF و Word.");
      return;
    }
    if (f && f.size > maxFileSize) {
      setErr("حجم الملف يتجاوز 2 ميغابايت.");
      return;
    }
    setErr("");
    setFile(f || null);
  };
  let clearFile = () => {
    setFile(null);
    setX({ ...x, file_name: "", file_path: "" });
  };
  let submit = async () => {
    setBusy(true);
    const e = await save({ ...m, x, file });
    setBusy(false);
    if (e) setErr(e);
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modalhead">
          <h2>
            {m.item ? "تعديل العنصر" : "إضافة عنصر"} — {labels[m.section]}
          </h2>
          <button onClick={close}>
            <X />
          </button>
        </div>
        <label>
          العنوان / الاسم
          <input
            value={x.title}
            onChange={(e) => put("title", e.target.value)}
            required
          />
        </label>
        <div className="two">
          <label>
            السنة
            <input
              value={x.year}
              onChange={(e) => put("year", e.target.value)}
            />
          </label>
          <label>
            المؤلف / الدور
            <input
              value={x.author}
              onChange={(e) => put("author", e.target.value)}
            />
          </label>
        </div>
        <div className="two">
          <label>
            التاريخ
            <input
              type="date"
              value={x.event_date}
              onChange={(e) => put("event_date", e.target.value)}
            />
          </label>
          <label>
            المكان
            <input
              value={x.location}
              onChange={(e) => put("location", e.target.value)}
            />
          </label>
        </div>
        <div className="two">
          <label>
            النوع
            <input
              value={x.item_type}
              onChange={(e) => put("item_type", e.target.value)}
              placeholder="PDF، كتاب، تقرير..."
            />
          </label>
          <label>
            البريد الإلكتروني
            <input
              type="email"
              value={x.email}
              onChange={(e) => put("email", e.target.value)}
            />
          </label>
        </div>
        <label>
          الوصف / التفاصيل
          <textarea
            rows="5"
            value={x.description}
            onChange={(e) => put("description", e.target.value)}
          />
        </label>
        <label className="upload">
          <span>
            <Upload size={16} /> إرفاق ملف (PDF أو Word)
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => pick(e.target.files?.[0])}
          />
          {(file || x.file_path) && (
            <small>
              {file ? file.name : x.file_name}{" "}
              <button type="button" className="link" onClick={clearFile}>
                إزالة
              </button>
            </small>
          )}
        </label>
        {err && (
          <p className="error" role="alert">
            {err}
          </p>
        )}
        <div className="modalbuttons">
          <button className="secondary" onClick={close}>
            إلغاء
          </button>
          <button className="primary" disabled={busy} onClick={submit}>
            {busy ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </div>
      </div>
    </div>
  );
}
function TextEditor({ m, close, save }) {
  const [x, setX] = useState(m.x);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  let submit = async () => {
    setBusy(true);
    const e = await save(m.key, x);
    setBusy(false);
    if (e) setErr(e);
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modalhead">
          <h2>تعديل — {labels[m.key]}</h2>
          <button onClick={close}>
            <X />
          </button>
        </div>
        <label>
          العنوان
          <input
            value={x.title || ""}
            onChange={(e) => setX({ ...x, title: e.target.value })}
          />
        </label>
        <label>
          النص
          <textarea
            rows="8"
            value={x.text || ""}
            onChange={(e) => setX({ ...x, text: e.target.value })}
          />
        </label>
        {err && (
          <p className="error" role="alert">
            {err}
          </p>
        )}
        <div className="modalbuttons">
          <button className="secondary" onClick={close}>
            إلغاء
          </button>
          <button className="primary" disabled={busy} onClick={submit}>
            {busy ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </div>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
