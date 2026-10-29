# SWE → FDE Academy

A local, buildless academy with the original Chapters 1–11, four module folders, shared assets, practical exercises, plus Chapters 12–26 and 178 quiz questions.

## Run locally

From this folder:

```sh
python3 serve.py
```

Open http://127.0.0.1:8000. Keep the terminal running; press Control-C to stop. On macOS you can also double-click `Start Academy.command`. No package installation is required.

The HTML can be opened directly, but use the local server for consistent browser-local progress across chapters. Always use the same hostname and port: localhost and 127.0.0.1 have separate storage.

## Files

- `index.html`: dashboard and chapter search.
- `modules/module-01/chapter-01.html` through `chapter-06.html`: foundations.
- `modules/module-02/chapter-07.html` through `chapter-11.html`: customer discovery and communication.
- `modules/module-03/chapter-12.html`: system design, with shared progress and a chapter-specific capacity lab.
- `assets/css/academy.css`: responsive shared styling and print styles.
- `assets/js/catalog.js`: chapter metadata.
- `assets/js/quizzes.js`: 178-question bank and answer explanations.
- `assets/js/academy.js`: completion, navigation, quiz grading, drafts, backup/import.
- `assets/js/practice.js`: local classification, role assignment, reflection, checklist, and traceability feedback.
- `assets/images`: local copies of original lesson images and diagrams, plus the academy illustration.
- `resources.html`: dated resource verification and replacement links.
- `lesson_plan/original-lessons.json`: recovered original authored lesson markup for provenance.
- `lesson_plan/resource-verification.json`: verification results and qualifications.

Each chapter contains its actual lesson HTML. There is no monolithic content loader or runtime build dependency. Edit chapter prose in its HTML page; update chapter metadata and question banks in their shared files.

## Progress and privacy

Completion, best scores, latest answers, review selections, and exercise drafts are stored in localStorage under `swe-fde-academy.v1`. No account, cookies, analytics or backend is used. Clearing browser data or private browsing can erase this work. Export progress from the dashboard to save a backup; import replaces current device progress after confirmation. Storage failures display a notice. External resource links require internet access; all lesson images and core functionality run locally.

## Content provenance and adaptations

Recovered from the rendered “SWE To FDE Playbook” conversation, preserving substantive authored prose, case studies, tables, code examples and section order. Original custom interactive controls are adapted to native HTML controls, locally scored quizzes, saved writing exercises and self-review rubrics. AI-feedback buttons are not connected to an AI service and have been replaced by transparent self-review guidance. Scenario and job-description figures are illustrative training examples. Chapter 12 is newly authored continuation material. Module 3 begins with system design, a capacity model, failure exercises, and a design review workshop.

Resources were checked October 23, 2026. Video verification means matching page/title availability, not full playback or an audit of every claim. Uncertain or expired URLs are explicitly marked; verified replacements are included where available. Images retain their original source credits; third-party image rights remain with their owners. Review those rights before public redistribution.

Chapter 13 adds API integration and enterprise data flows, a local payload validator, recovery exercise, and eight assessment questions. Reading resources checked October 25, 2026.

Chapter 14 adds production readiness, a launch-evidence review, incident exercise, operational workshop, and eight assessment questions. Reading resources checked October 25, 2026.

Chapter 15 covers outcome measurement and adoption, with an illustrative capacity calculator, adoption exercise, evaluation workshop, and eight assessment questions. Resources checked October 25, 2026.

Chapter 16 is an integrated FDE engagement capstone with saved artifacts, a scope-change exercise, weighted self-review, and eight knowledge questions. Resources checked October 25, 2026.

Module 4 begins with Chapter 17: debugging customer environments, a fictional incident evidence console, saved investigation drafts, and eight quiz questions. Resources checked October 27, 2026.

Chapter 18 covers enterprise security, identity, and data boundaries, with a local authorization simulator, saved security-review drafts, and eight quiz questions. Resources checked October 27, 2026.

Chapter 19 covers reliable AI-assisted customer workflows, with an evaluation calculator, saved task and release drafts, and eight quiz questions. Resources checked October 27, 2026.

Chapter 20 covers reusable solutions and product feedback, with an effort calculator, saved proposals, and eight quiz questions. Resources checked October 28, 2026.

Chapter 21 covers managing multiple customer engagements, with a capacity calculator, saved portfolio plans, and eight quiz questions. Resources checked October 28, 2026.

Chapter 22 covers executive communication and business cases, with a scenario calculator, saved briefs, and eight quiz questions. Resources checked October 28, 2026.

Chapter 23 covers career growth, portfolios, and interview preparation, with a portfolio review lab, saved practice plans, and eight quiz questions. Resources checked October 29, 2026.

Chapter 24 completes the academy with an end-to-end capstone, evidence gates, saved assessment artifacts, and eight quiz questions. Resources checked October 29, 2026.

Chapter 25 opens Module 5: AI Foundations, with intuitive LLM concepts, a concept explorer, official documentation, and eight quiz questions. Resources checked October 29, 2026.

Chapter 26 covers prompts, context, structured outputs, and model selection, with a decision explorer and eight quiz questions. Resources checked October 29, 2026.
