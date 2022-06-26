import assert from "assert";
import axios from "axios";
import { connect, disconnect } from "../server/server.js";
import { borrarTests } from "../server/Login/database/loginDaoBaseDeDatos.js";
describe("servidor de pruebas", () => {
  let urlPersonas;
  let urlVentas;
  let urlLogin;
  let urlRegistrarse;
  let urlAutos;
  let token;
  let config;
  before(async () => {
    const port = await connect();
    urlLogin = `http://localhost:${port}/api/login`;
    urlRegistrarse = `http://localhost:${port}/api/registrarse`;
    urlVentas = `http://localhost:${port}/api/ventas`;
    urlPersonas = `http://localhost:${port}/api/personas`;
    urlAutos = `http://localhost:${port}/api/autos`;
  });

  after(async () => {
    console.log("borrando tests");

    borrarTests();
    await disconnect();
  });

  describe("el servidor esta escuchando", () => {
    describe("Registrarse", () => {
      describe("al intentar registrarse", () => {
        describe("si los datos son validos", () => {
          it("retorna token", async () => {
            const registro = { email: "test@test.com", password: "12345" };
            const { data: respuestaRegistro, status } = await axios.post(
              urlRegistrarse,
              registro
            );
            assert.strictEqual(status, 201);
            assert.strictEqual(!!respuestaRegistro.token, true);
          });
        });
        describe("si los datos son incorrectos", () => {
          it("no registra nada y devuelve un error", async () => {
            const registro = { email: "alan17pc@gmail.com" };
            await assert.rejects(
              axios.post(urlRegistrarse, registro),
              (error) => {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(
                  error.response.data,
                  "faltan valor(es) para los siguientes campos: 'password'"
                );
                return true;
              }
            );
          });
        });
      });
    });

    describe("Login", () => {
      describe("al intentar logearse", () => {
        describe("si los datos son validos", () => {
          it("retorna mail y token", async () => {
            const login = { email: "test@test.com", password: "12345" };
            const { data: respuestaLogin, status } = await axios.post(
              urlLogin,
              login
            );
            token = respuestaLogin.token;
            config = {
              headers: { authorization: `Bearer ${token}` },
            };
            assert.strictEqual(status, 201);
            assert.strictEqual(
              !!respuestaLogin.token && !!respuestaLogin.email,
              true
            );
          });
        });
        describe("si los datos son incorrectos", () => {
          it("no agrega nada y devuelve un error", async () => {
            const login = { email: "alan17pc@gmail.com", password: "" };
            await assert.rejects(axios.post(urlLogin, login), (error) => {
              assert.strictEqual(error.response.status, 401);
              assert.strictEqual(
                error.response.data,
                "Datos de login incorrectos"
              );
              return true;
            });
          });
        });
      });
    });

    describe("Ventas", () => {
      let idVenta;
      let ventaInsertada;
      const idErroneo = "asd123";

      describe("al intentar insertar una", () => {
        describe("si los datos son validos", () => {
          it("devuelve venta", async () => {
            const venta = {
              vendedor: "Misterrrr test",
              valor: 122000,
              isTest: true,
            };
            const { data: respuestaVentas, status } = await axios.post(
              urlVentas,
              venta,
              config
            );
            idVenta = respuestaVentas.id;
            ventaInsertada = respuestaVentas;
            assert.strictEqual(status, 201);
            assert.strictEqual(
              venta.vendedor === respuestaVentas.vendedor &&
                venta.valor === respuestaVentas.valor,
              true
            );
          });
        });

        describe("si los datos son incorrectos", () => {
          it("no agrega nada y devuelve un error", async () => {
            const venta = {
              valor: 122000,
            };
            await assert.rejects(
              axios.post(urlVentas, venta, config),
              (error) => {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(
                  error.response.data,
                  `faltan valor(es) para los siguientes campos: 'vendedor'`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar obtener todas", () => {
        it("devuelve ventas", async () => {
          const { data: respuestaVentas, status } = await axios.get(urlVentas);
          assert.strictEqual(status, 200);
          assert.strictEqual(respuestaVentas.length > 0, true);
        });
      });

      describe("al intentar obtener una", () => {
        describe("si el id es valido", () => {
          it("devuelve venta", async () => {
            const { data: respuestaVentas, status } = await axios.get(
              urlVentas + `?id=${idVenta}`
            );

            assert.strictEqual(status, 200);

            assert.strictEqual(respuestaVentas.id === ventaInsertada.id, true);
          });
        });

        describe("si el id no es valido", () => {
          it("no encuentra nada y devuelve un error", async () => {
            const venta = {
              vendedor: "Misterrrr test",
              valor: 122000,
            };
            await assert.rejects(
              axios.get(urlVentas + `?id=${idErroneo}`),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar editar una", () => {
        describe("si los datos son validos", () => {
          it("devuelve venta", async () => {
            const venta = {
              id: idVenta,
              vendedor: "Misterrrr test",
              valor: 123000,
            };
            const { data: respuestaVentas, status } = await axios.patch(
              urlVentas,
              venta,
              config
            );
            assert.strictEqual(status, 201);
            assert.strictEqual(
              venta.vendedor === respuestaVentas.vendedor &&
                venta.valor === respuestaVentas.valor,
              true
            );
          });
        });

        describe("si los datos son incorrectos", () => {
          it("no agrega nada y devuelve un error", async () => {
            const venta = {
              vendedor: "Misterrrr test",
              valor: 122000,
            };
            await assert.rejects(
              axios.patch(urlVentas, venta, config),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(error.response.data, `Falta mandar ID`);
                return true;
              }
            );
          });
        });
      });

      describe("al intentar borrar una", () => {
        describe("si los datos son validos", () => {
          it("devuelve informacion", async () => {
            const { data: respuestaVentas, status } = await axios.delete(
              urlVentas + "/?id=" + idVenta,
              config
            );

            assert.strictEqual(status, 201);
            assert.strictEqual(
              respuestaVentas.id === idVenta && respuestaVentas.borrada,
              true
            );
          });
        });
        describe("si los datos son incorrectos", () => {
          it("no borra nada y devuelve un error", async () => {
            await assert.rejects(
              axios.delete(urlVentas + `/?id=${idErroneo}`, config),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });
    });

    describe("Personas", () => {
      let idPersona;
      let personaInsertada;
      const idErroneo = "asd123";

      describe("al intentar insertar una", () => {
        describe("si los datos son validos", () => {
          it("devuelve persona", async () => {
            const persona = {
              nombre: "Alan",
              apellido: "Michelin",
              tipo: "Empleado",
            };
            const { data: respuestaPersonas, status } = await axios.post(
              urlPersonas,
              persona,
              config
            );
            idPersona = respuestaPersonas.id;
            personaInsertada = respuestaPersonas;
            assert.strictEqual(status, 201);
            assert.strictEqual(
              persona.nombre === respuestaPersonas.nombre,
              true
            );
          });
        });

        describe("si los datos son incorrectos", () => {
          it("no agrega nada y devuelve un error", async () => {
            const persona = {
              nombre: "Alan",
            };
            await assert.rejects(
              axios.post(urlPersonas, persona, config),
              (error) => {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(
                  error.response.data,
                  `faltan valor(es) para los siguientes campos: 'apellido,tipo'`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar obtener todas", () => {
        it("devuelve personas", async () => {
          const { data: respuestaPersonas, status } = await axios.get(
            urlPersonas
          );
          assert.strictEqual(status, 200);
          assert.strictEqual(respuestaPersonas.length > 0, true);
        });
      });

      describe("al intentar obtener una", () => {
        describe("si el id es valido", () => {
          it("devuelve persona", async () => {
            const { data: respuestaPersonas, status } = await axios.get(
              urlPersonas + `?id=${idPersona}`
            );

            assert.strictEqual(status, 200);

            assert.strictEqual(
              respuestaPersonas.id === personaInsertada.id,
              true
            );
          });
        });

        describe("si el id no es valido", () => {
          it("no encuentra nada y devuelve un error", async () => {
            await assert.rejects(
              axios.get(urlPersonas + `?id=${idErroneo}`),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar editar una", () => {
        describe("si los datos son validos", () => {
          it("devuelve persona", async () => {
            const persona = {
              nombre: "Alan1",
              apellido: "Michelin123",
              tipo: "Cliente",
              id: idPersona,
            };
            const { data: respuestaPersonas, status } = await axios.patch(
              urlPersonas,
              persona,
              config
            );
            assert.strictEqual(status, 201);
            assert.strictEqual(
              persona.nombre === respuestaPersonas.nombre &&
                persona.apellido === respuestaPersonas.apellido &&
                persona.tipo === respuestaPersonas.tipo,
              true
            );
          });
        });

        describe("si los datos son incorrectos", () => {
          it("no agrega nada y devuelve un error", async () => {
            const persona = {
              nombre: "Alan1",
              apellido: "Michelin123",
              tipo: "Cliente",
              id: idErroneo,
            };
            await assert.rejects(
              axios.patch(urlPersonas, persona, config),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar borrar una", () => {
        describe("si los datos son validos", () => {
          it("devuelve informacion", async () => {
            const { data: respuestaPersonas, status } = await axios.delete(
              urlPersonas + "/?id=" + idPersona,
              config
            );

            assert.strictEqual(status, 201);
            assert.strictEqual(
              respuestaPersonas.id === idPersona && respuestaPersonas.borrada,
              true
            );
          });
        });
        describe("si los datos son incorrectos", () => {
          it("no borra nada y devuelve un error", async () => {
            await assert.rejects(
              axios.delete(urlPersonas + `/?id=${idErroneo}`, config),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });
    });

    describe("Autos", () => {
      let idAuto;
      let autoInsertado;
      const idErroneo = "asd123";

      describe("al intentar insertar uno", () => {
        describe("si los datos son validos", () => {
          it("devuelve auto", async () => {
            const auto = {
              anio: 2015,
              marca: "Test",
              modelo: "Test",
              valor: 123123,
              disponible: true,
            };
            const { data: respuestaAutos, status } = await axios.post(
              urlAutos,
              auto,
              config
            );
            idAuto = respuestaAutos.id;
            autoInsertado = respuestaAutos;
            assert.strictEqual(status, 201);
            assert.strictEqual(auto.marca === respuestaAutos.marca, true);
          });
        });

        describe("si los datos son incorrectos", () => {
          it("no agrega nada y devuelve un error", async () => {
            const auto = {
              anio: 2012,
              marca: "Nissaaaan",
              modelo: "GTX",
            };
            await assert.rejects(
              axios.post(urlAutos, auto, config),
              (error) => {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(
                  error.response.data,
                  `faltan valor(es) para los siguientes campos: 'valor,disponible'`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar obtener todos", () => {
        it("devuelve autos", async () => {
          const { data: respuestaAutos, status } = await axios.get(urlAutos);
          assert.strictEqual(status, 200);
          assert.strictEqual(respuestaAutos.length > 0, true);
        });
      });

      describe("al intentar obtener uno", () => {
        describe("si el id es valido", () => {
          it("devuelve auto", async () => {
            const { data: respuestaAutos, status } = await axios.get(
              urlAutos + `?id=${idAuto}`
            );

            assert.strictEqual(status, 200);

            assert.strictEqual(respuestaAutos.id === autoInsertado.id, true);
          });
        });

        describe("si el id no es valido", () => {
          it("no encuentra nada y devuelve un error", async () => {
            await assert.rejects(
              axios.get(urlAutos + `?id=${idErroneo}`),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar editar uno", () => {
        describe("si los datos son validos", () => {
          it("devuelve auto", async () => {
            const auto = {
              id: idAuto,
              anio: 2015,
              marca: "Testeando123",
              modelo: "TesteandoASD",
              valor: 123123,
              disponible: true,
            };
            const { data: respuestaAutos, status } = await axios.patch(
              urlAutos,
              auto,
              config
            );
            assert.strictEqual(status, 201);
            assert.strictEqual(
              auto.id === respuestaAutos.id &&
                auto.marca === respuestaAutos.marca &&
                auto.modelo === respuestaAutos.modelo,
              true
            );
          });
        });

        describe("si los datos son incorrectos", () => {
          it("no agrega nada y devuelve un error", async () => {
            const auto = {
              id: idErroneo,
              anio: 2015,
              marca: "Test marca de auto genial",
              modelo: "Model 123",
              valor: 123123,
              disponible: true,
            };
            await assert.rejects(
              axios.patch(urlAutos, auto, config),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });

      describe("al intentar borrar uno", () => {
        describe("si los datos son validos", () => {
          it("devuelve informacion", async () => {
            const { data: respuestaAutos, status } = await axios.delete(
              urlAutos + "/?id=" + idAuto,
              config
            );

            assert.strictEqual(status, 201);
            assert.strictEqual(
              respuestaAutos.id === idAuto && respuestaAutos.borrada,
              true
            );
          });
        });
        describe("si los datos son incorrectos", () => {
          it("no borra nada y devuelve un error", async () => {
            await assert.rejects(
              axios.delete(urlAutos + `/?id=${idErroneo}`, config),
              (error) => {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(
                  error.response.data,
                  `ID: ${idErroneo} no encontrado`
                );
                return true;
              }
            );
          });
        });
      });
    });
  });
});
