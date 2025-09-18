package Attendence.SIH.Attendence.SIH.controller;

import Attendence.SIH.Attendence.SIH.dto.AttendanceDtos.AttendanceRequestDto;
import Attendence.SIH.Attendence.SIH.dto.AttendanceDtos.AttendanceResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
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

    @GetMapping
    public List<AttendanceResponseDto> all() {
        return new ArrayList<>(STORE.values());
    }

    @GetMapping("/user/{userId}")
    public List<AttendanceResponseDto> byUser(@PathVariable Long userId) {
        return STORE.values().stream().filter(a -> Objects.equals(a.userId, userId)).toList();
    }
}
