package com.list.list.Controllers;

import com.list.list.Components.JwtUtil;
import com.list.list.Model.Usuario;
import com.list.list.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;

    @Autowired
    private JwtUtil jwtUtil;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody Usuario usuario){
        try {
            Usuario user = service.login(usuario.getEmail(), usuario.getSenha());


            String token = jwtUtil.gerarToken(user.getEmail());

            return ResponseEntity.ok(token);


        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario){

        try{
            Usuario novoUsuario = service.cadastrar(usuario);

            String token = jwtUtil.gerarToken(novoUsuario.getEmail());

            return ResponseEntity.ok(token);
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        //return service.cadastrar(usuario);
    }
}
