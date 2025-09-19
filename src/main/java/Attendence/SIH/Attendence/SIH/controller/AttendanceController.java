package Attendence.SIH.Attendence.SIH.controller;

import Attendence.SIH.Attendence.SIH.dto.AttendanceDtos.AttendanceRequestDto;
import Attendence.SIH.Attendence.SIH.dto.AttendanceDtos.AttendanceResponseDto;
import Attendence.SIH.Attendence.SIH.dto.AttendanceDtos.QrOnlyRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class AttendanceController {

    private static final AtomicLong IDS = new AtomicLong(1);
    private static final Map<Long, AttendanceResponseDto> STORE = new LinkedHashMap<>();

    @PostMapping("/mark")
    public ResponseEntity<AttendanceResponseDto> mark(@RequestBody AttendanceRequestDto req) {
        // very basic validation for demo: ensure QR exists and is active
        if (req.qrData == null || QrCodeController.findByCode(req.qrData).isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        AttendanceResponseDto a = new AttendanceResponseDto();
        a.id = IDS.getAndIncrement();
        a.userId = req.userId;
        a.status = "PRESENT";
        a.checkInTime = Instant.now().toString();
        a.qrCodeDataUsed = req.qrData;
        STORE.put(a.id, a);
        return ResponseEntity.ok(a);
    }

    // New: Mark attendance using only QR data (User inferred or not required)
    @PostMapping("/mark-qr")
    public ResponseEntity<AttendanceResponseDto> markByQr(@RequestBody QrOnlyRequestDto req) {
        // In stub mode, accept any non-null QR data to make UI flows smoother.
        if (req.qrData == null || req.qrData.isBlank()) {
            return ResponseEntity.badRequest().header("X-Error", "qrData is required").build();
        }
        AttendanceResponseDto a = new AttendanceResponseDto();
        a.id = IDS.getAndIncrement();
        // In a real app, userId could be derived from security context (JWT). Left null for stub.
        a.userId = null;
        a.status = "PRESENT";
        a.checkInTime = Instant.now().toString();
        a.qrCodeDataUsed = req.qrData;
        STORE.put(a.id, a);
        return ResponseEntity.ok(a);
    }

    @GetMapping
    public List<AttendanceResponseDto> all() {
        return new ArrayList<>(STORE.values());
    }

    @GetMapping("/user/{userId}")
    public List<AttendanceResponseDto> byUser(@PathVariable Long userId) {
        return STORE.values().stream().filter(a -> Objects.equals(a.userId, userId)).toList();
    }
}
