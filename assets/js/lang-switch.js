/* Sélecteur de langue FR/EN pour le thème mkdocs-shadcn.
 *
 * shadcn n'a pas de sélecteur de langue intégré (contrairement à Material qui
 * lisait `extra.alternate`). Le plugin mkdocs-static-i18n construit le FR à la
 * racine et l'EN sous le préfixe /en/. Ce script injecte un petit segmented
 * control dans la top bar et calcule l'URL de la page dans l'autre langue à
 * partir du chemin courant — robuste aux mises à jour du thème (aucun template
 * copié).
 */
(function () {
  "use strict";

  // FR = racine, EN = préfixe /en/. On bascule juste ce segment.
  function frUrlFor(path) {
    return path.replace(/^\/en(\/|$)/, "/");
  }
  function enUrlFor(path) {
    return /^\/en(\/|$)/.test(path) ? path : "/en" + path;
  }

  function build() {
    var path = window.location.pathname;
    var isEn = /^\/en(\/|$)/.test(path);

    var wrap = document.createElement("div");
    wrap.className = "seabim-lang-switch";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language");

    var langs = [
      { code: "fr", label: "FR", href: frUrlFor(path), active: !isEn },
      { code: "en", label: "EN", href: enUrlFor(path), active: isEn },
    ];
    langs.forEach(function (l) {
      var a = document.createElement("a");
      a.className = "seabim-lang-switch__item";
      a.textContent = l.label;
      a.href = l.href;
      a.hreflang = l.code;
      if (l.active) {
        a.setAttribute("aria-current", "true");
      }
      wrap.appendChild(a);
    });
    return wrap;
  }

  function inject() {
    // Conteneur de droite de la top bar (recherche, repo, toggles).
    var cluster = document.querySelector("header .ml-auto");
    if (!cluster || cluster.querySelector(".seabim-lang-switch")) {
      return;
    }
    cluster.insertBefore(build(), cluster.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
