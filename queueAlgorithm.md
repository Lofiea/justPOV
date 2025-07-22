## Queue System Algorithm (Detailed Steps)

1. **Daily Initialization**
  - At the start of each new day, the system:
    - Resets the queue (dailyQueue = [])
    - Marks all employees as "unavailable" by default
    - Waits for employees to clock in via the app

2. **Employee Clock-In**
  - When an employee taps "Check In":
    - If they are not already in the queue:
        - Mark them as available
        - Add their employeeID to the end of the queue
    - The order in which employees check in determines the queue for that day.

3. **Handling Absences**
    - Employees who do not clock in are considered unavailable and are excluded from the day’s queue.
    - They are not eligible to take walk-in customers.

4. **Walk-In Customer Logic**
  - When a walk-in customer arrives:
    - The first employee in the queue is offered the client.
    - However, if the required service time would overlap with their next scheduled appointment, skip to the next available employee.
        - The system auto-checks appointment overlaps using timestamps.
        - The skipped employee stays in queue.
  - Admin Override:
    - Admin can manually override the logic and move any employee to the top of the queue if needed (drag-and-drop style).

5. **Service Duration Overlap**
  - If an employee takes a service but exceeds expected duration:
    - The system automatically flags them as "delayed"
    - They lose their next turn, and the queue skips them once.

6. **End-of-Day Reset**
  - At a defined cutoff time (e.g., 11:59 PM):
    - The queue resets.
    - Optionally log the full day’s queue activity and store in queueHistory[date].

