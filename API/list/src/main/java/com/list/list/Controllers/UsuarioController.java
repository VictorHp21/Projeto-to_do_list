package com.list.list.Controllers;

import com.list.list.Model.Usuario;
import com.list.list.Services.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;


    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody Usuario usuario){
        try {
            Usuario user = service.login(usuario.getEmail(), usuario.getSenha());

            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario){

        try{
            Usuario novoUsuario = service.cadastrar(usuario);
            return ResponseEntity.ok(novoUsuario);
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        //return service.cadastrar(usuario);
    }
}
