package com.list.list.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Tarefas")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String titulo;
    private String descricao;

    private LocalDate dataPrazo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Usuario usuario;

    public Tarefa(){}

    public Tarefa(String titulo, String descricao, LocalDate dataPrazo, Usuario usuario) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataPrazo = dataPrazo;
        this.usuario = usuario;
    }

    public long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDate getDataPrazo() {
        return dataPrazo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setDataPrazo(LocalDate dataPrazo) {
        this.dataPrazo = dataPrazo;
    }
}





