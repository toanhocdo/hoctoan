<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Kiểm tra method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Kiểm tra có file upload không
if (!isset($_FILES["fileToUpload"])) {
    echo json_encode(["status" => "error", "message" => "Không có file được tải lên"]);
    exit;
}

$target_dir = "uploads/"; // Thư mục trên host để lưu ảnh

// Tạo thư mục nếu chưa tồn tại
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$file = $_FILES["fileToUpload"];
$originalName = basename($file["name"]);
$fileExtension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

// Tạo tên file unique với timestamp
$timestamp = time();
$problemKey = isset($_POST['problemKey']) ? $_POST['problemKey'] : 'unknown';
$newFileName = $problemKey . '_' . $timestamp . '_' . $originalName;
$target_file = $target_dir . $newFileName;

$uploadOk = 1;

// Kiểm tra kích thước file (5MB)
if ($file["size"] > 5000000) {
    echo json_encode(["status" => "error", "message" => "File quá lớn. Kích thước tối đa là 5MB."]);
    $uploadOk = 0;
}

// Kiểm tra định dạng file
$allowedTypes = array("jpg", "jpeg", "png", "gif", "webp");
if (!in_array($fileExtension, $allowedTypes)) {
    echo json_encode(["status" => "error", "message" => "Chỉ cho phép các định dạng: JPG, JPEG, PNG, GIF, WEBP"]);
    $uploadOk = 0;
}

// Kiểm tra file có phải là ảnh thật không
$check = getimagesize($file["tmp_name"]);
if ($check === false) {
    echo json_encode(["status" => "error", "message" => "File không phải là hình ảnh hợp lệ."]);
    $uploadOk = 0;
}

// Kiểm tra file đã tồn tại chưa
if (file_exists($target_file)) {
    echo json_encode(["status" => "error", "message" => "File đã tồn tại."]);
    $uploadOk = 0;
}

// Thực hiện upload nếu mọi thứ OK
if ($uploadOk == 1) {
    if (move_uploaded_file($file["tmp_name"], $target_file)) {
        // Log thông tin upload
        $logData = [
            'timestamp' => date('Y-m-d H:i:s'),
            'original_name' => $originalName,
            'new_name' => $newFileName,
            'size' => $file["size"],
            'problem_key' => $problemKey,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        ];
        
        // Ghi log vào file (tùy chọn)
        file_put_contents('uploads/upload_log.txt', json_encode($logData) . "\n", FILE_APPEND);
        
        echo json_encode([
            "status" => "success", 
            "message" => "File " . htmlspecialchars($originalName) . " đã được tải lên thành công.",
            "filename" => $newFileName,
            "url" => "/uploads/" . $newFileName
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Đã có lỗi xảy ra khi tải file lên server."]);
    }
} else {
    // Nếu có lỗi validation, thông báo đã được gửi ở trên
}
?>