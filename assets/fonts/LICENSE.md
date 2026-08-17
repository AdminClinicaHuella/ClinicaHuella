# Tipografías

Los ficheros `.woff2` de esta carpeta se sirven desde nuestro propio dominio
para que el navegador de quien visita la web no tenga que conectarse a Google.
Proceden del proyecto Google Fonts y las tres familias se distribuyen bajo la
**SIL Open Font License 1.1**, que permite expresamente usarlas, alojarlas y
redistribuirlas, también en proyectos comerciales.

| Familia | Ficheros | Autoría | Licencia |
|---|---|---|---|
| Inter | `inter-latin.woff2`, `inter-latin-ext.woff2` | Rasmus Andersson | OFL 1.1 |
| Poppins | `poppins-700-*.woff2`, `poppins-800-*.woff2` | Indian Type Foundry, Jonny Pinhorn | OFL 1.1 |
| Bebas Neue | `bebas-neue-400-dmp.woff2` | Ryoichi Tsunekawa (Dharma Type) | OFL 1.1 |

Texto completo de la licencia: <https://openfontlicense.org>

## Notas

- **Inter** es una fuente *variable*: un solo fichero por subset cubre los
  pesos 400 a 700. No hay que descargar uno por peso.
- **Bebas Neue** está recortada a los caracteres `D`, `M` y `P`, los únicos
  que aparecen en la web (el crédito del pie). Si ese texto cambia, hay que
  regenerar el subset.
- Solo se incluyen los subsets `latin` y `latin-ext`, suficientes para español
  e inglés.

## Cómo regenerar

Pedir a Google el CSS con un User-Agent de navegador moderno (para que
devuelva `woff2`), descargar los ficheros que indique y actualizar
`css/fonts.css` con las rutas locales, conservando los `unicode-range`:

```bash
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120" \
  "https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400..700&display=swap"
```

Para un subset a medida, añadir `&text=LOSCARACTERES` a la URL.
