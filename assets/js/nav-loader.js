(function() {
    var headerHTML = '<header class="common-header" id="realmx-header">\n    <nav class="navbar navbar-expand-xl">\n        <div class="container-fluid main-nav">\n            <button class="navbar-toggler collapsed" id="nav-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-label="Toggle navigation">\n                <span></span><span></span><span></span>\n            </button>\n            <div class="header-logo">\n                <a class="navbar-brand" href="index.html"><img src="assets/images/logo-black.png" alt="RealmX" style="height:32px;"></a>\n            </div>\n            <div class="navbar-nav-container collapse navbar-collapse" id="navbarSupportedContent">\n                <ul class="navbar-nav nav-mega">\n                    <li class="nav-item dropdown">\n                        <a class="nav-link top-level dropdown-toggle header-menu-links" role="button" data-bs-toggle="dropdown" href="#">产品</a>\n                        <div class="dropdown-menu mega-menu">\n                            <div style="padding:24px;">\n                                <div class="row">\n                                    <div class="col-xl-3">\n                                        <h6 style="color:var(--realmx-blue);font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">两栖系列</h6>\n                                        <ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:8px;"><a href="product.html" style="color:rgba(255,255,255,0.8);text-decoration:none;">RealmX Racing Edition</a></li></ul>\n                                    </div>\n                                    <div class="col-xl-3">\n                                        <h6 style="color:var(--realmx-blue);font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">即将推出</h6>\n                                        <ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:8px;"><a href="#" style="color:rgba(255,255,255,0.8);text-decoration:none;">RealmX Explorer（海陆空三栖一体机）</a></li><li style="margin-bottom:8px;"><a href="#" style="color:rgba(255,255,255,0.8);text-decoration:none;">RealmX Pro</a></li></ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </li>\n                    <li class="nav-item">\n                        <a class="nav-link top-level header-menu-links" href="solutions.html">解决方案</a>\n                    </li>\n                    <li class="nav-item">\n                        <a class="nav-link top-level header-menu-links" href="support.html">资源与支持</a>\n                    </li>\n                </ul>\n                <ul class="navbar-nav ms-auto">\n                    <li class="nav-item">\n                        <a class="nav-link header-buy-link" href="buy.html">立即购买</a>\n                    </li>\n                    <li class="nav-item" id="nav-auth"></li>\n                </ul>\n            </div>\n        </div>\n    </nav>\n</header>\n<div style="height:56px;"></div>';

    var footerHTML = '<footer class="realmx-footer">\n    <div class="footer-inner">\n        <div class="footer-grid">\n            <div>\n                <div class="footer-brand-name"><img src="assets/images/logo-black.png" alt="RealmX" style="height:48px;"></div>\n                <p class="footer-tagline">BEYOND LIMITS</p>\n            </div>\n            <div class="footer-col">\n                <h4>产品</h4>\n                <ul>\n                    <li><a href="product.html">RealmX Racing Edition</a></li>\n                    <li><a href="accessories.html">配件</a></li>\n                    <li><a href="buy.html">立即购买</a></li>\n                </ul>\n            </div>\n            <div class="footer-col">\n                <h4>解决方案</h4>\n                <ul>\n                    <li><a href="solutions.html">特种检测</a></li>\n                    <li><a href="solutions.html">贴壁作业</a></li>\n                    <li><a href="solutions.html">井道建模</a></li>\n                    <li><a href="solutions.html">林业测绘</a></li>\n                </ul>\n            </div>\n            <div class="footer-col">\n                <h4>技术支持</h4>\n                <ul>\n                    <li><a href="support.html">快速入门</a></li>\n                    <li><a href="support.html">技术文档</a></li>\n                    <li><a href="support.html">常见问题</a></li>\n                    <li><a href="support.html">联系我们</a></li>\n                </ul>\n            </div>\n            <div class="footer-col">\n                <h4>关于</h4>\n                <ul>\n                    <li><a href="about.html">关于 RealmX</a></li>\n                    <li><a href="news.html">新闻动态</a></li>\n                    <li><a href="about.html">加入我们</a></li>\n                    <li><a href="login.html">登录</a></li>\n                </ul>\n            </div>\n        </div>\n        <div class="footer-bottom">\n            <p>&copy; 2026 RealmX. All rights reserved.</p>\n            <div class="footer-bottom-links">\n                <a href="#">隐私政策</a>\n                <a href="#">使用条款</a>\n                <a href="#">联系我们</a>\n            </div>\n        </div>\n    </div>\n</footer>';

    function init() {
        var headerSlot = document.getElementById('realmx-header-slot');
        var footerSlot = document.getElementById('realmx-footer-slot');

        if (headerSlot) headerSlot.innerHTML = headerHTML;
        if (footerSlot) footerSlot.innerHTML = footerHTML;

        if (typeof updateNavAuth === 'function') updateNavAuth();

        // Manual dropdown toggle (AMD webpack bundles Bootstrap internally)
        document.addEventListener('click', function(e) {
            var toggle = e.target.closest('#realmx-header-slot .dropdown-toggle');
            if (toggle) {
                e.preventDefault();
                e.stopPropagation();
                var dropdown = toggle.closest('.dropdown');
                var isOpen = dropdown.classList.contains('show');
                // Close all dropdowns first
                document.querySelectorAll('#realmx-header-slot .dropdown.show').forEach(function(d) {
                    d.classList.remove('show');
                    var menu = d.querySelector('.dropdown-menu');
                    if (menu) menu.classList.remove('show');
                });
                // Toggle current
                if (!isOpen) {
                    dropdown.classList.add('show');
                    var menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.classList.add('show');
                    toggle.setAttribute('aria-expanded', 'true');
                } else {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            } else {
                // Click outside - close all
                document.querySelectorAll('#realmx-header-slot .dropdown.show').forEach(function(d) {
                    d.classList.remove('show');
                    var menu = d.querySelector('.dropdown-menu');
                    if (menu) menu.classList.remove('show');
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
