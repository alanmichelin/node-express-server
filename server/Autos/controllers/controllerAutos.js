import * as api from "../services/autos.js";
// import { manejarErrores } from "../../functions.js";

export async function getAll(req, res, next) {
  let Autos;
  try {
    if (req.query.marca) {
      Autos = api.obtenerAutosSegunMarca(req.query.marca);
    } else {
      Autos = api.obtenerAutos();
    }
    res.json(Autos);
  } catch (error) {
    // const { mensaje, codigo } = prepararRespuestaConError(error);
    // res.status(codigo).json({ mensaje });
    next(error);
  }
}
export async function getById(req, res, next) {
  try {
    const auto = api.obtenerAutosegunId(req.params.id);
    res.json(auto);
  } catch (error) {
    const { mensaje, codigo } = prepararRespuestaConError(error);
    res.status(codigo).json({ mensaje });
  }
}
export async function post(req, res, next) {
  try {
    const auto = req.body;
    const autoAgregado = api.agregarAuto(auto);
    res.status(201).json(autoAgregado);
  } catch (error) {
    if (error.tipo === "NOMBRE_UNICO") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
  //   next(error);
}
// routerAutos.delete("/:id", (req, res, next) => {
//   try {
//     api.borrarAutosegunId(req.params.id);
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// routerAutos.put("/:id", (req, res, next) => {
//   try {
//     const datosActualizados = req.body;
//     const autoActualizado = api.reemplazarAuto(
//       req.params.id,
//       datosActualizados
//     );
//     res.json(autoActualizado);
//   } catch (error) {
//     if (error.tipo === "NO_ENCONTRADO") {
//       res.status(404).json({ error: error.message });
//     } else {
//       res.status(400).json({ error: error.message });
//     }
//   }
// });
