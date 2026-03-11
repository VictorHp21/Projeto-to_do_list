package com.list.list.Controllers;

import com.list.list.Model.Usuario;
import com.list.list.Services.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;


    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/cadastro")
    public Usuario cadastrar(@RequestBody Usuario usuario){
        return service.cadastrar(usuario);
    }
}
