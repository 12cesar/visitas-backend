const { request, response } = require("express");
const Usuario = require("../models/usuario");
const Cliente = require("../models/cliente");
const bcryptjs = require("bcryptjs");
const generarToken = require("../helpers/generar-jwt");
const Conduccion = require("../models/conduccion");

const postLogin = async (req = request, res = response) => {
  const { coleccion } = req.params;
  let password;
  let usuario;
  let validarPassword;
  let token;
  let conduccion;
  switch (coleccion) {
    case "usuario":
      usuario = req.body.usuario;
      password = req.body.password;
      const user = await Usuario.findOne({ usuario });
      if (!user) {
        return res.json({
          ok: false,
          msg: "Usuario no existe, converse con el administrador",
          user: null,
          token: null,
        });
      }
      if (!user.estado) {
        return res.json({
          ok: false,
          msg: "Usuario bloqueado, converse con el administrador",
          user: null,
          token: null,
        });
      }
      validarPassword = bcryptjs.compareSync(password, user.password);
      if (!validarPassword) {
        return res.json({
          ok: false,
          msg: "Contraseña no valida",
          user: null,
          token: null,
        });
      }
      if (user.rol === 'CHOFER_ROLE') {
        const conducc = await Conduccion.findOne({chofer:user._id})
                                            .populate('chofer','nombre')
                                            .populate('vehiculo', 'nombre');
        if (conducc) {
          conduccion = conducc.vehiculo.nombre;
        }else{
          conduccion = null;
        }
        
      }else{
        conduccion = null
      }
      token= await generarToken.generarJWT(user._id);

      res.json({
        ok: true,
        msg: "Login correcto",
        user,
        token,
        conduccion
      });
      break;
    case "cliente":
        usuario = req.body.usuario;
        password = req.body.password;
        const cliente = await Cliente.findOne({dni:usuario});
        if (!cliente) {
            return res.json({
                ok:false,
                msg:'Cliente no existe, porfavor registrese',
                cliente:null,
                token:null
            })
        }
        if (!cliente.estado) {
            return res.json({
                ok:false,
                msg:'Cliente bloqueado, converse con el administrador',
                cliente:null,
                token:null
            })
        }
        validarPassword= bcryptjs.compareSync(password, cliente.password)
        if (!validarPassword) {
            return res.json({
                ok:false,
                msg:'Contraseña no valida',
                cliente:null,
                token:null
            })
            
        }
        token = await generarToken.generarJWT(cliente._id);
        res.json({
            ok:true,
            msg:'Login correcto',
            cliente,
            token
        })
      break;
    default:
      break;
  }
};
const getLogin = async(req=request, res=response)=>{
  const user = req.usuarioToken;
  const x ='x-token'
  let conduccion;
  if (user.rol === 'CHOFER_ROLE') {
    const conducc = await Conduccion.findOne({chofer:user._id})
                                        .populate('chofer','nombre')
                                        .populate('vehiculo', 'nombre');
    if (conducc) {
      conduccion = conducc.vehiculo.nombre;
    }else{
      conduccion = null;
    }
    
  }else{
    conduccion = null
  }
  const {token} = req.headers;
  const token = await generarToken.generarJWT(user._id);
  res.json({
    ok:true,
    msg:'Token valido',
    user,
    token,
    conduccion
  })
}
module.exports = {
  postLogin,
  getLogin
};
