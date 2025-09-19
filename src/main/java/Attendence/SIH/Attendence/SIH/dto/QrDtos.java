package Attendence.SIH.Attendence.SIH.dto;

import java.time.LocalDateTime;

public class QrDtos {
    public static class QrGenerateRequestDto {
        public String eventId;
        public LocalDateTime validFrom;
        public LocalDateTime validUntil;
    }
    public static class QrResponseDto {
        public Long id;
        public String codeData;
        public LocalDateTime validFrom;
        public LocalDateTime validUntil;
        public boolean active;
        public String eventId;
    }
}
