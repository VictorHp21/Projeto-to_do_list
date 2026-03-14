package com.list.list.Services;

import com.list.list.Configuration.criptoSenha;
import com.list.list.Model.Tarefa;
import com.list.list.Model.Usuario;
import com.list.list.Repositories.TarefaRepository;
import com.list.list.Repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    private final TarefaRepository repository;

    private final UsuarioRepository usuarioRepository;



    public TarefaService(TarefaRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }



    public Tarefa cadastrarTarefa(Tarefa tarefa, Long usuarioId){

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(()-> new RuntimeException("Usuário não encontrado"));

        tarefa.setUsuario(usuario);

        return repository.save(tarefa);
    }

    public Optional<Tarefa>  buscarPorId(Long id){
        return repository.findById(id);
    }



    public List<Tarefa> listarPorUsuario(Long usuarioId){
        return repository.findByUsuarioId(usuarioId);
    }

    public boolean DeletarTarefa(Long id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }

        return false;
    }

    // private String titulo;
    //    private String descricao;
    //
    //    private LocalDate dataPrazo;

    public Tarefa atualizar (Long id, Tarefa tarefaAtualizada){
        Tarefa tarefa = repository.findById(id)
                .orElseThrow(()-> new RuntimeException("Tarefa não e encontrada"));

        tarefa.setTitulo(tarefaAtualizada.getTitulo());
        tarefa.setDescricao(tarefaAtualizada.getDescricao());
        tarefa.setDataPrazo(tarefaAtualizada.getDataPrazo());

        return repository.save(tarefa);
    }


}
