package lk.ijse.dep10.fileupload;

import lk.ijse.dep10.fileupload.api.UploadController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@Configuration
public class WebAppConfig {

    @Bean
    public UploadController uploadController(){
        return new UploadController();
    }
}