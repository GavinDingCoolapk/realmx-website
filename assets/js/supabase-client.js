const SUPABASE_URL = 'https://bphilcufwkfewpfnckqi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwaGlsY3Vmd2tmZXdwZm5ja3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDYwNjksImV4cCI6MjA5MTIyMjA2OX0.uQykpIf9bixMrrOPhq2BRWvS1z4kvqQZOqamGKtCPDE';

let _supabase = null;

function getSupabase() {
    if (!_supabase) {
        _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: { persistSession: true, autoRefreshToken: true }
        });
    }
    return _supabase;
}

async function getCurrentUser() {
    const { data: { user } } = await getSupabase().auth.getUser();
    return user;
}

async function getUserProfile() {
    const user = await getCurrentUser();
    if (!user) return null;
    const { data } = await getSupabase().from('profiles').select('*').eq('id', user.id).single();
    return data;
}

async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

async function requireAdmin() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = '../login.html';
        return null;
    }
    const { data: profile } = await getSupabase().from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') {
        window.location.href = '../index.html';
        return null;
    }
    return { user, profile };
}

function updateNavAuth() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;
    getCurrentUser().then(user => {
        if (user) {
            navAuth.innerHTML = '<a class="nav-link nav-login-link" href="account.html">个人中心</a>';
        } else {
            navAuth.innerHTML = '<a class="nav-link nav-login-link" href="login.html">登录</a>';
        }
    });
}

function updateNavAuthAdmin() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;
    getCurrentUser().then(user => {
        if (user) {
            navAuth.innerHTML = '<a class="nav-link nav-login-link" href="../account.html">个人中心</a>';
        } else {
            navAuth.innerHTML = '<a class="nav-link nav-login-link" href="../login.html">登录</a>';
        }
    });
}
