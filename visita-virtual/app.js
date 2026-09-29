"use strict";
const tourEnglish = document.documentElement.lang === "en";
const tourTranslations = {"Ir a ":"Go to ","Recepción y esperas":"Reception and waiting areas","Pasillos":"Corridors","Consultas":"Consultation rooms","Área clínica":"Clinical area","Cargando vista…":"Loading view…","No se encuentra esta vista.":"This view could not be found.","No se ha podido cargar la panorámica.":"The panorama could not be loaded.","El navegador no ha podido mostrar la vista 360°.":"Your browser could not display the 360° view.","Cargando ":"Loading ","Salir de pantalla completa":"Exit full screen","Pantalla completa":"Full screen"};
const tourText = (text) => tourEnglish ? (tourTranslations[text] || text) : text;
const $ = (id) => document.getElementById(id);
/* Conecta un manejador solo si el elemento existe, para que quitar un botón
   del HTML no aborte el resto del fichero (y con él el init() del final). */
const on = (id, evento, fn) => $(id)?.addEventListener(evento, fn);
let viewer,
  config,
  current,
  pending,
  loaded = false;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
function closeRooms(restore = false) {
  const panel = $("roomsPanel");
  if (!panel) return;
  panel.hidden = true;
  $("roomsButton")?.setAttribute("aria-expanded", "false");
  if (restore) $("roomsButton")?.focus();
}
function go(id, fromPoint = false) {
  closeRooms();
  if (
    !viewer ||
    !loaded ||
    pending !== current ||
    !config.scenes.some((s) => s.id === id) ||
    id === current
  )
    return;
  pending = id;
  $("error").hidden = true;
  const target = config.scenes.find((s) => s.id === id);
  viewer.loadScene(
    id,
    0,
    fromPoint ? viewer.getYaw() : target.yaw,
    viewer.getHfov(),
  );
}
function hotspot(el, args) {
  el.classList.add("point");
  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.setAttribute("aria-label", tourText("Ir a ") + args.title);
  const icon = document.createElement("span");
  icon.className = "point-ring";
  icon.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6M12 8v11"/></svg>';
  const label = document.createElement("span");
  label.className = "point-label";
  label.textContent = args.title;
  el.append(icon, label);
  let press = null;
  el.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    press = [e.clientX, e.clientY];
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointerup", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      press &&
      Math.hypot(e.clientX - press[0], e.clientY - press[1]) < 10
    )
      go(args.id, true);
    press = null;
  });
  el.addEventListener("pointercancel", () => (press = null));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      go(args.id, true);
    }
  });
}
function refresh(id) {
  const room = config.scenes.find((s) => s.id === id);
  $("roomTitle").textContent = room.title;
  document.title = `${room.title} · Huella 360°`;
  $("status").textContent =
    (tourEnglish ? `You are in ${room.title}. ${room.links.length} ${room.links.length === 1 ? "point" : "points"} to continue.` : `Estás en ${room.title}. ${room.links.length} ${room.links.length === 1 ? "punto" : "puntos"} para continuar.`);
  document.querySelectorAll(".room-link").forEach((b) => {
    if (b.dataset.scene === id)
      b.setAttribute("aria-current", "location");
    else b.removeAttribute("aria-current");
  });
  try {
    history.replaceState(null, "", "#" + id);
  } catch {}
}
async function init() {
  try {
    const embedded = $("visita-data");
    if (embedded) {
      config = JSON.parse(embedded.textContent);
    } else {
      const res = await fetch("./visita.json");
      if (!res.ok) throw Error("Missing configuration");
      config = await res.json();
    }
    const groups = {
        recepcion: tourText("Recepción y esperas"),
        pasillo: tourText("Pasillos"),
        consultas: tourText("Consultas"),
        clinica: tourText("Área clínica"),
      },
      scenes = {};
    for (const [key, title] of Object.entries(groups)) {
      const list = config.scenes.filter((s) => s.group === key);
      if (!list.length) continue;
      const h = document.createElement("h3");
      h.className = "room-group";
      h.textContent = title;
      $("roomList").append(h);
      for (const s of list) {
        const b = document.createElement("button");
        b.className = "room-link";
        b.textContent = s.title;
        b.dataset.scene = s.id;
        b.onclick = () => go(s.id);
        $("roomList").append(b);
      }
    }
    for (const s of config.scenes) {
      scenes[s.id] = {
        type: "equirectangular",
        panorama: s.image,
        yaw: s.yaw,
        pitch: 0,
        northOffset: 0,
        hotSpots: s.links.map((link) => {
          const target = config.scenes.find((x) => x.id === link.target);
          return {
            pitch: link.pitch,
            yaw: link.yaw,
            type: "info",
            cssClass: "point",
            createTooltipFunc: hotspot,
            createTooltipArgs: { id: target.id, title: target.title },
            clickHandlerFunc: (e) => {
              e.stopPropagation();
              go(target.id, true);
            },
          };
        }),
      };
    }
    const hash = decodeURIComponent(location.hash.slice(1));
    current = scenes[hash] ? hash : config.firstScene;
    pending = current;
    viewer = pannellum.viewer("panorama", {
      default: {
        firstScene: current,
        autoLoad: true,
        autoRotate: 0,
        showControls: false,
        showFullscreenCtrl: false,
        showZoomCtrl: false,
        compass: false,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        sceneFadeDuration: reduced ? 0 : 350,
        mouseZoom: true,
        keyboardZoom: true,
        draggable: true,
        disableKeyboardCtrl: false,
        friction: 0.25,
        strings: {
          loadingLabel: tourText("Cargando vista…"),
          noPanoramaError: tourText("No se encuentra esta vista."),
          fileAccessError: tourText("No se ha podido cargar la panorámica."),
          genericWebGLError:
            tourText("El navegador no ha podido mostrar la vista 360°."),
        },
      },
      scenes,
    });
    refresh(current);
    viewer.on("scenechange", (id) => {
      pending = id;
      $("loadingText").textContent =
        tourText("Cargando ") + config.scenes.find((s) => s.id === id).title + "…";
      $("loading").classList.toggle("compact", loaded);
      $("loading").hidden = false;
      $("error").hidden = true;
    });
    viewer.on("load", () => {
      const id = viewer.getScene();
      current = id;
      loaded = true;
      pending = id;
      $("loading").hidden = true;
      $("error").hidden = true;
      refresh(id);
    });
    viewer.on("error", () => {
      $("loading").hidden = true;
      $("error").hidden = false;
    });
  } catch (e) {
    console.error(e);
    $("loading").hidden = true;
    $("error").hidden = false;
  }
}
on("roomsButton", "click", () => {
  const abierto = $("roomsPanel").hidden;
  $("roomsPanel").hidden = !abierto;
  $("roomsButton").setAttribute("aria-expanded", String(abierto));
  if (abierto) $("closeRooms")?.focus();
});
on("closeRooms", "click", () => closeRooms(true));
on("fullscreenButton", "click", async () => {
  const embedded = document.documentElement.classList.contains("tour-embedded");
  if (embedded && document.documentElement.classList.contains("tour-expanded")) {
    window.parent.postMessage({ type: "huella-tour-minimize" }, location.origin);
    return;
  }
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }
  try {
    if (!$("experience")?.requestFullscreen) throw new Error("Fullscreen unavailable");
    await $("experience").requestFullscreen();
  } catch (error) {
    // Safari móvil y otros navegadores pueden no permitir pantalla completa en un iframe.
    if (embedded) window.parent.postMessage({ type: "huella-tour-expand" }, location.origin);
    else console.warn("No se pudo ampliar la visita", error);
  }
});
function updateFullscreenButton() {
  const activa = !!document.fullscreenElement || document.documentElement.classList.contains("tour-expanded");
  const boton = $("fullscreenButton");
  if (!boton) return;
  boton.setAttribute("aria-label", tourText(activa ? "Salir de pantalla completa" : "Pantalla completa"));
  boton.setAttribute("aria-pressed", String(activa));
  // Los <svg> no tienen la propiedad .hidden de HTMLElement: hay que tocar el atributo
  boton.querySelector(".icono-ampliar").toggleAttribute("hidden", activa);
  boton.querySelector(".icono-reducir").toggleAttribute("hidden", !activa);
}
document.addEventListener("fullscreenchange", updateFullscreenButton);
window.addEventListener("message", (event) => {
  if (window.parent === window || event.origin !== location.origin || event.source !== window.parent) return;
  if (event.data?.type !== "huella-tour-expanded") return;
  document.documentElement.classList.toggle("tour-expanded", event.data.expanded === true);
  updateFullscreenButton();
});
on("retryButton", "click", () => {
  if (viewer && pending) {
    $("error").hidden = true;
    $("loading").hidden = false;
    viewer.loadScene(pending);
  } else location.reload();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRooms(true);
});
document.addEventListener("click", (e) => {
  const panel = $("roomsPanel");
  if (panel && !panel.hidden && !panel.contains(e.target) && !$("roomsButton").contains(e.target))
    closeRooms();
});
init();
