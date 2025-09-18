package Attendence.SIH.Attendence.SIH.dto;

public class AttendanceDtos {
    public static class AttendanceRequestDto {
        public Long userId;
        public String qrData;
    }
    public static class AttendanceResponseDto {
        public Long id;
        public Long userId;
        public String status; // PRESENT/ABSENT/LATE
        public String checkInTime; // ISO string
        public String qrCodeDataUsed;
    }
}
