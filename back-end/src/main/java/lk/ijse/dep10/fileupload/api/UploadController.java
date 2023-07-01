package lk.ijse.dep10.fileupload.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/uploads")
public class UploadController {

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void saveImage(@RequestPart("image") Part imageFile) throws IOException {
        File desktopDir = new File(System.getProperty("user.home"), "Desktop");
        File uploadDir = new File(desktopDir, "uploads");
        if (!uploadDir.exists()) uploadDir.mkdir();
        File imagePath = new File(uploadDir, imageFile.getSubmittedFileName());
        imageFile.write(imagePath.getAbsolutePath());
    }
}