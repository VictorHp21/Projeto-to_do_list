package com.list.list.Controllers;

import com.list.list.Model.Tarefa;
import com.list.list.Model.Usuario;
import com.list.list.Services.TarefaService;
import com.list.list.Services.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "*")
public class TarefaController {

    private final TarefaService service;


    public TarefaController(TarefaService service) {
        this.service = service;
    }



    @PostMapping
    public ResponseEntity<?> salvarTarefa(@RequestBody Tarefa tarefa){
        try{
            Tarefa novaTarefa = service.cadastrarTarefa(tarefa);
            return ResponseEntity.ok(novaTarefa);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Tarefa> listarTarefas(){
        return service.listarTodos();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarTarefaPorID(@PathVariable Long id){
        return service.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerTarefa(@PathVariable Long id){
        boolean removido = service.DeletarTarefa(id);

        if(removido){
            return ResponseEntity.ok("Tarefa removida com sucesso! ✅");
        }else{
            return ResponseEntity.notFound().build();
        }
    }



   @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @RequestBody Tarefa tarefa){
        Tarefa tarefaAtualizada = service.atualizar(id, tarefa);
        return ResponseEntity.ok(tarefaAtualizada);
   }





}
