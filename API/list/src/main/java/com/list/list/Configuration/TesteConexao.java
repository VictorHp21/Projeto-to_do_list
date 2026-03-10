package com.list.list.Configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
public class TesteConexao {

    @Bean
    CommandLineRunner testar(DataSource dataSource) {
        return args -> {
            try (Connection conn = dataSource.getConnection()) {
                System.out.println("✅ Conectado ao banco com sucesso!");
                System.out.println("Banco: " + conn.getCatalog());
            } catch (Exception e) {
                System.out.println("❌ Erro ao conectar no banco");
                e.printStackTrace();
            }
        };
    }
}