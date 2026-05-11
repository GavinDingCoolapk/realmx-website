(function() {
    // ===== Header =====
    var headerHTML = [
        '<header class="common-header" id="realmx-header">',
        '  <nav class="nav-main">',
        '    <div class="nav-inner">',
        '      <a class="nav-logo" href="index.html"><img src="assets/images/logo-black.png" alt="RealmX" style="height:28px;"></a>',
        '      <button class="nav-hamburger" id="nav-hamburger" aria-label="菜单">',
        '        <span></span><span></span><span></span>',
        '      </button>',
        '      <div class="nav-links" id="nav-links">',
        '        <div class="nav-dropdown">',
        '          <a class="nav-link" href="javascript:void(0)" data-dropdown="products">产品</a>',
        '          <div class="nav-dropdown-menu" id="dropdown-products">',
        '            <div class="nav-dropdown-group">',
        '              <div class="nav-dropdown-col">',
        '                <div class="nav-dropdown-title">两栖系列</div>',
        '                <a href="product.html">RealmX Racing Edition</a>',
        '              </div>',
        '              <div class="nav-dropdown-col">',
        '                <div class="nav-dropdown-title">即将推出</div>',
        '                <a href="javascript:void(0)">RealmX Explorer（海陆空三栖一体机）</a>',
        '                <a href="javascript:void(0)">RealmX Pro</a>',
        '              </div>',
        '            </div>',
        '          </div>',
        '        </div>',
        '        <a class="nav-link" href="solutions.html">解决方案</a>',
        '        <a class="nav-link" href="support.html">资源与支持</a>',
        '        <div class="nav-right">',
        '          <a class="nav-link nav-buy" href="buy.html">立即购买</a>',
        '          <span id="nav-auth"></span>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </nav>',
        '</header>',
        '<div class="nav-spacer"></div>'
    ].join('\n');

    // ===== Footer =====
    var footerHTML = [
        '<footer class="realmx-footer">',
        '  <div class="footer-inner">',
        '    <div class="footer-grid">',
        '      <div>',
        '        <div class="footer-brand-name">RealmX</div>',
        '        <p class="footer-tagline">BEYOND LIMITS</p>',
        '      </div>',
        '      <div class="footer-col">',
        '        <h4>产品</h4>',
        '        <ul>',
        '          <li><a href="product.html">RealmX Racing Edition</a></li>',
        '          <li><a href="accessories.html">配件</a></li>',
        '          <li><a href="buy.html">立即购买</a></li>',
        '        </ul>',
        '      </div>',
        '      <div class="footer-col">',
        '        <h4>解决方案</h4>',
        '        <ul>',
        '          <li><a href="solutions.html">特种检测</a></li>',
        '          <li><a href="solutions.html">贴壁作业</a></li>',
        '          <li><a href="solutions.html">井道建模</a></li>',
        '          <li><a href="solutions.html">林业测绘</a></li>',
        '        </ul>',
        '      </div>',
        '      <div class="footer-col">',
        '        <h4>技术支持</h4>',
        '        <ul>',
        '          <li><a href="support.html">快速入门</a></li>',
        '          <li><a href="support.html">技术文档</a></li>',
        '          <li><a href="support.html">常见问题</a></li>',
        '          <li><a href="support.html">联系我们</a></li>',
        '        </ul>',
        '      </div>',
        '      <div class="footer-col">',
        '        <h4>关于</h4>',
        '        <ul>',
        '          <li><a href="about.html">关于 RealmX</a></li>',
        '          <li><a href="news.html">新闻动态</a></li>',
        '          <li><a href="about.html">加入我们</a></li>',
        '          <li><a href="login.html">登录</a></li>',
        '        </ul>',
        '      </div>',
        '    </div>',
        '    <div class="footer-bottom">',
        '      <p>&copy; 2026 RealmX. All rights reserved.</p>',
        '      <div class="footer-bottom-links">',
        '        <a href="#">隐私政策</a>',
        '        <a href="#">使用条款</a>',
        '        <a href="#">联系我们</a>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</footer>'
    ].join('\n');

    function init() {
        var headerSlot = document.getElementById('realmx-header-slot');
        var footerSlot = document.getElementById('realmx-footer-slot');

        if (headerSlot) headerSlot.innerHTML = headerHTML;
        if (footerSlot) footerSlot.innerHTML = footerHTML;

        // Auth state
        if (typeof updateNavAuth === 'function') updateNavAuth();

        // Hamburger toggle (mobile)
        var hamburger = document.getElementById('nav-hamburger');
        var navLinks = document.getElementById('nav-links');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                hamburger.classList.toggle('open');
                navLinks.classList.toggle('open');
            });
            // Close mobile menu on nav link click
            navLinks.addEventListener('click', function(e) {
                var link = e.target.closest('.nav-link:not(.nav-buy)');
                if (link && !link.hasAttribute('data-dropdown') && window.innerWidth < 1200) {
                    hamburger.classList.remove('open');
                    navLinks.classList.remove('open');
                }
            });
        }

        // Dropdown toggle
        document.addEventListener('click', function(e) {
            var toggle = e.target.closest('[data-dropdown]');
            if (toggle) {
                e.preventDefault();
                e.stopPropagation();
                var menuId = toggle.getAttribute('data-dropdown');
                var menu = document.getElementById('dropdown-' + menuId);
                var isOpen = toggle.classList.contains('active');
                // Close all
                closeAllDropdowns();
                if (!isOpen && menu) {
                    toggle.classList.add('active');
                    menu.classList.add('open');
                }
            } else {
                closeAllDropdowns();
            }

            // Close mobile menu on outside click
            if (navLinks && window.innerWidth < 1200 && !e.target.closest('#realmx-header')) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });

        function closeAllDropdowns() {
            document.querySelectorAll('.nav-dropdown.active').forEach(function(d) {
                d.classList.remove('active');
            });
            document.querySelectorAll('.nav-dropdown-menu.open').forEach(function(m) {
                m.classList.remove('open');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
