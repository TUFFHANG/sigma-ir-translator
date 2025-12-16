import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

# ---------- English ----------

english_plan = (
    "Implement a production-ready Sigma-IR Translator web application. "
    "The app must translate English into valid normalized Sigma-IR blocks, "
    "enforce grammar and normalization rules, emit error blocks when needed, "
    "and never hallucinate missing information."
)

english_proceed = (
    " Proceed with the next step of the implementation according to the plan above."
)

def english_workflow(steps):
    text = english_plan
    for _ in range(steps):
        text += english_proceed
    return text


# ---------- Sigma-IR ----------

# Intent + constraints encoded ONCE
sigma_plan = (
    "[[I2 C0 C2 S1 O2|sigma-ir-translator,web-app,grammar-validate,"
    "normalization,error-blocks,deterministic|_]]"
)

def sigma_workflow(_steps):
    # No per-step tokens; continuation is implicit
    return sigma_plan


# ---------- Benchmark ----------

print("Steps | English tokens | Sigma-IR tokens | Ratio")
print("------|----------------|----------------|------")

for steps in [1, 3, 5, 10, 20, 50]:
    e = len(enc.encode(english_workflow(steps)))
    s = len(enc.encode(sigma_workflow(steps)))
    ratio = round(e / s, 2)
    print(f"{steps:5} | {e:14} | {s:14} | {ratio:5}")
