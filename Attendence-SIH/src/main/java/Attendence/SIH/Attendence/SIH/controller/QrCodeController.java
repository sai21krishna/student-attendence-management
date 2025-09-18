package Attendence.SIH.Attendence.SIH.controller;

import Attendence.SIH.Attendence.SIH.dto.QrDtos.QrGenerateRequestDto;
import Attendence.SIH.Attendence.SIH.dto.QrDtos.QrResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin
public class QrCodeController {

    private static final AtomicLong IDS = new AtomicLong(1);
    private static final Map<Long, QrResponseDto> STORE = new LinkedHashMap<>();

    @PostMapping("/generate")
    public ResponseEntity<QrResponseDto> generate(@RequestBody QrGenerateRequestDto req) {
        QrResponseDto qr = new QrResponseDto();
        qr.id = IDS.getAndIncrement();
        qr.codeData = UUID.randomUUID() + ":" + System.currentTimeMillis();
        qr.validFrom = req.validFrom != null ? req.validFrom : LocalDateTime.now();
        qr.validUntil = req.validUntil != null ? req.validUntil : qr.validFrom.plusHours(2);
        qr.active = true;
        qr.eventId = req.eventId;
        STORE.put(qr.id, qr);
        return ResponseEntity.ok(qr);
    }

    @GetMapping
    public List<QrResponseDto> all() {
        return new ArrayList<>(STORE.values());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        QrResponseDto removed = STORE.remove(id);
        return removed == null ? ResponseEntity.notFound().build() : ResponseEntity.noContent().build();
    }

    public static Optional<QrResponseDto> findByCode(String code) {
        return STORE.values().stream().filter(q -> Objects.equals(q.codeData, code) && q.active).findFirst();
    }
}
