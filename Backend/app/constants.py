MAX_FILE_SIZE = 25 * 1024 * 1024

SUPPORTED_FILE_TYPES = [
    "PDF",
    "DOCX",
    "TXT"
]

SUPPORTED_MIME_TYPES = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
    "text/plain": "TXT",
}

PROJECT_FEATURES = [
    "Document Upload",
    "Semantic Search",
    "Question Answering",
    "Source Citation",
]

FILE_CONSTANTS = {
    ".pdf": {
        "folder": "pdf",
        "pattern": "PDF_",
        "regex": r"PDF_(\d+)"
    },
    ".docx": {
        "folder": "word",
        "pattern": "DOC_",
        "regex": r"DOC_(\d+)"
    },
    ".txt": {
        "folder": "text",
        "pattern": "TXT_",
        "regex": r"TXT_(\d+)"
    }
}