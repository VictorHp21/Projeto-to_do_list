package com.list.list.Services;

import com.list.list.Configuration.criptoSenha;
import com.list.list.Model.Tarefa;
import com.list.list.Model.Usuario;
import com.list.list.Repositories.TarefaRepository;
import com.list.list.Repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository repository;




    public TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }



    public Tarefa cadastrarTarefa(Tarefa tarefa){

        return repository.save(tarefa);
    }



    public List<Tarefa> listarTodos(){
        return repository.findAll();
    }


}
