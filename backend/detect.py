import cv2
from ultralytics import YOLO

# Load YOLOv8 Nano model
model = YOLO("yolov8n.pt")

# Open webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Could not open webcam")
    exit()

print("Press Q to Quit")

while True:
    ret, frame = cap.read()

    if not ret:
        break

    # Detect objects
    results = model(frame)

    # Draw detection boxes
    annotated_frame = results[0].plot()

    # Display result
    cv2.imshow("YOLOv8 Live Detection", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()