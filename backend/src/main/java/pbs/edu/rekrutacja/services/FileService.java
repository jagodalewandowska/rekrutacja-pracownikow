package pbs.edu.rekrutacja.services;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pbs.edu.rekrutacja.models.File;

import java.util.Optional;

public interface FileService {
    Page<File> getFiles(Pageable pageable);

    Optional<File> getFile(Integer fileId);

    File setFile(File file);

    @Transactional
    void deleteFile(Integer fileId);
}
