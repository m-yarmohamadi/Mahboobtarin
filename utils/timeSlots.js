export default function timeSlots(startHour, endHour, intervalMinutes) {
    const timeSlotsList = [];

    const totalSlots = ((endHour - startHour) * 60) / intervalMinutes;
  
    for (let i = 0; i < totalSlots; i++) {
      const totalMinutes = startHour * 60 + i * intervalMinutes;
      const hour = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
      const minutes = (totalMinutes % 60).toString().padStart(2, '0');
      timeSlotsList.push(`${hour}:${minutes}`);
    }
  
    return timeSlotsList;
}
