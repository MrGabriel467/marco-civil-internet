document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Responsivo Mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // 2. Simulador Interativo de Neutralidade de Rede (index.html)
    const btnSimulate = document.getElementById("btn-simulate");
    const simFeedback = document.getElementById("sim-feedback");
    const pkt1 = document.getElementById("pkt-1");
    const pkt2 = document.getElementById("pkt-2");
    const pkt3 = document.getElementById("pkt-3");

    if (btnSimulate && pkt1 && pkt2 && pkt3) {
        btnSimulate.addEventListener("click", () => {
            const selectedMode = document.querySelector('input[name="neutrality-mode"]:checked').value;
            const trackWidth = pkt1.parentElement.clientWidth - pkt1.clientWidth;
            const packets = [pkt1, pkt2, pkt3];

            // Reset instantâneo
            packets.forEach((pkt) => {
                pkt.style.transition = "none";
                pkt.style.transform = "translateX(0px)";
            });

            // Força reflow para reiniciar animação
            void pkt1.offsetWidth;

            if (selectedMode === "on") {
                packets.forEach((pkt) => {
                    pkt.style.transition = "transform 1.4s ease-in-out";
                    pkt.style.transform = `translateX(${trackWidth}px)`;
                });
                simFeedback.innerHTML =
                    "<strong>Com Neutralidade (Art. 9º):</strong> Todos os pacotes chegaram simultaneamente. A operadora não discriminou o tráfego por origem ou tipo de serviço.";
            } else {
                pkt1.style.transition = "transform 0.9s ease-in-out";
                pkt2.style.transition = "transform 3.4s linear";
                pkt3.style.transition = "transform 4.2s linear";

                pkt1.style.transform = `translateX(${trackWidth}px)`;
                pkt2.style.transform = `translateX(${trackWidth}px)`;
                pkt3.style.transform = `translateX(${trackWidth}px)`;

                simFeedback.innerHTML =
                    "<strong>Sem Neutralidade (Traffic Shaping):</strong> O streaming comercial passou na frente, enquanto o portal educacional e a startup nacional sofreram redução artificial de banda.";
            }
        });
    }

    // 3. Quiz Interativo sobre o Marco Civil (index.html)
    const quizContainer = document.getElementById("quiz-container");
    if (quizContainer) {
        const questions = [
            {
                question: "1. Qual evento internacional acelerou a aprovação do Marco Civil da Internet em 2013/2014?",
                options: [
                    "A criação da World Wide Web por Tim Berners-Lee",
                    "As revelações de Edward Snowden sobre espionagem digital global pela NSA",
                    "O lançamento do primeiro smartphone no Brasil"
                ],
                answer: 1,
                explanation: "As denúncias de espionagem contra cidadãos brasileiros e a Presidência da República levaram o governo a dar urgência constitucional ao projeto."
            },
            {
                question: "2. O que garante o princípio da Neutralidade de Rede (Art. 9º)?",
                options: [
                    "Que toda Internet no Brasil deve ser gratuita para estudantes",
                    "Que provedores de conexão tratem pacotes de dados de forma isonômica, sem discriminar por conteúdo ou serviço",
                    "Que redes sociais não podem moderar comentários ofensivos"
                ],
                answer: 1,
                explanation: "O Artigo 9º impede que operadoras reduzam a velocidade ou bloqueiem aplicações específicas por interesses comerciais."
            },
            {
                question: "3. Segundo o Artigo 19 do Marco Civil, quando um provedor de aplicações responde civilmente por conteúdo de terceiro?",
                options: [
                    "Imediatamente após a publicação do usuário",
                    "Apenas se descumprir ordem judicial específica determinando a remoção do conteúdo",
                    "Sempre que alguém enviar um e-mail pedindo a exclusão"
                ],
                answer: 1,
                explanation: "O Art. 19 buscou evitar a censura privada prévia, exigindo decisão judicial específica (com exceções como nudez não consensual no Art. 21)."
            },
            {
                question: "4. Qual era a principal crítica feita à 'Lei Azeredo' (PL 84/1999) antes do Marco Civil?",
                options: [
                    "Focava apenas na criminalização e vigilância prévia antes de garantir direitos civis aos internautas",
                    "Proibia o uso de cabos de fibra óptica no país",
                    "Isentava completamente crimes financeiros cometidos na Web"
                ],
                answer: 0,
                explanation: "Apelidada de 'AI-5 Digital', a Lei Azeredo tinha viés punitivista e motivou a sociedade civil a propor uma carta de direitos civis primeiro."
            }
        ];

        let currentIndex = 0;
        let score = 0;

        const qText = document.getElementById("quiz-question");
        const qOptions = document.getElementById("quiz-options");
        const qExplanation = document.getElementById("quiz-explanation");
        const qProgress = document.getElementById("quiz-progress");
        const btnNext = document.getElementById("btn-next-question");

        function renderQuestion() {
            const current = questions[currentIndex];
            qText.textContent = current.question;
            qOptions.innerHTML = "";
            qExplanation.hidden = true;
            btnNext.hidden = true;
            qProgress.textContent = `Pergunta ${currentIndex + 1} de ${questions.length}`;

            current.options.forEach((optText, idx) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "quiz-option-btn";
                btn.textContent = optText;
                btn.addEventListener("click", () => handleAnswer(idx, btn));
                qOptions.appendChild(btn);
            });
        }

        function handleAnswer(selectedIdx, clickedBtn) {
            const current = questions[currentIndex];
            const allButtons = qOptions.querySelectorAll("button");
            allButtons.forEach((b) => (b.disabled = true));

            if (selectedIdx === current.answer) {
                clickedBtn.classList.add("correct");
                score++;
            } else {
                clickedBtn.classList.add("wrong");
                allButtons[current.answer].classList.add("correct");
            }

            qExplanation.textContent = current.explanation;
            qExplanation.hidden = false;
            btnNext.textContent = currentIndex < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado Final";
            btnNext.hidden = false;
        }

        btnNext.addEventListener("click", () => {
            currentIndex++;
            if (currentIndex < questions.length) {
                renderQuestion();
            } else {
                qText.textContent = `Quiz Concluído! Você acertou ${score} de ${questions.length} questões.`;
                qOptions.innerHTML = "";
                qExplanation.textContent =
                    score >= 3
                        ? "Excelente domínio sobre a Constituição da Internet brasileira!"
                        : "Vale revisar as abas de Origem e Impactos para consolidar os artigos da Lei 12.965/2014.";
                qExplanation.hidden = false;
                qProgress.textContent = "Finalizado";
                btnNext.hidden = true;
            }
        });

        renderQuestion();
    }
});