
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

samples = {
    "english_instruction": (
        "Design a morpheme-based language optimized for token compression and context persistence. "
        "Do not ask questions. Preserve existing state. Output a language specification."
    ),
    "sigma_instruction": (
        "[[I2 C0 C2 S1 O4|morpheme-lang,token-compress,context-persistence|_]]"
    ),
    "english_error": (
        "I cannot proceed because the output format is ambiguous. Please specify the target format."
    ),
    "sigma_error": (
        "[[E0|reason:ambiguous-output,requires:output-format|!error]]"
    ),
}

english_repeated = (
    "Do not ask questions. Preserve existing state. Output a language specification. "
) * 5

sigma_once = (
    "[[I2 C0 C2 S1 O4|morpheme-lang|_]]"
)

print("english_repeated", len(enc.encode(english_repeated)))
print("sigma_once", len(enc.encode(sigma_once)))


for k, v in samples.items():
    print(k, len(enc.encode(v)))
