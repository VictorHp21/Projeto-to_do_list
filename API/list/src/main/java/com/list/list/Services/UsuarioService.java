package com.list.list.Services;

import com.list.list.Configuration.criptoSenha;
import com.list.list.Model.Usuario;
import com.list.list.Repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    private final criptoSenha criptosenha;


    public UsuarioService(UsuarioRepository repository, criptoSenha criptosenha) {
        this.repository = repository;
        this.criptosenha = criptosenha;
    }

    //login

    public Usuario login(String email, String senha){
        Usuario usuario = repository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if(!criptosenha.passwordEncoder().matches(senha, usuario.getSenha())){
            throw new RuntimeException("Senha incorreta");
        }

        return usuario;
    }


    //cadastro

    public Usuario cadastrar(Usuario usuario){

        if(repository.existsByEmail(usuario.getEmail())){
            throw new RuntimeException("Email já cadastrado");
        }

        usuario.setSenha(criptosenha.passwordEncoder().encode(usuario.getSenha()));

        return repository.save(usuario);
    }



    public List<Usuario> listarTodos(){
        return repository.findAll();
    }


}
