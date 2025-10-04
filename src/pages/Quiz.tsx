import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Qual é a principal vantagem da reciclagem?",
    options: [
      "Reduzir o consumo de recursos naturais",
      "Aumentar o lucro das empresas",
      "Diminuir empregos",
      "Aumentar o consumo de energia"
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "O que significa ser sustentável?",
    options: [
      "Usar todos os recursos disponíveis",
      "Atender necessidades atuais sem comprometer futuras gerações",
      "Produzir mais plástico",
      "Desmatar áreas verdes"
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Qual prática NÃO é considerada ecológica?",
    options: [
      "Uso de energia solar",
      "Reciclagem de materiais",
      "Descarte inadequado de lixo",
      "Redução do consumo de água"
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Quanto tempo leva para um saco plástico se degradar?",
    options: [
      "1 ano",
      "10 anos",
      "100 anos",
      "Mais de 400 anos"
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "Qual é o principal gás causador do efeito estufa?",
    options: [
      "Oxigênio",
      "Nitrogênio",
      "Dióxido de carbono (CO2)",
      "Hidrogênio"
    ],
    correctAnswer: 2,
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizQuestions.length).fill(false)
  );

  const handleAnswerClick = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Resposta correta! 🎉");
    } else {
      toast.error("Resposta incorreta. Tente novamente!");
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  };

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const scorePercentage = (score / quizQuestions.length) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-eco flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-gradient-eco flex items-center justify-center">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground">
              Quiz Finalizado!
            </h1>
            
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                Sua pontuação:
              </p>
              <p className="text-5xl font-bold text-primary">
                {score}/{quizQuestions.length}
              </p>
              <Progress value={scorePercentage} className="h-3 mt-4" />
              <p className="text-sm text-muted-foreground">
                {scorePercentage.toFixed(0)}% de acertos
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                onClick={handleRestart}
                className="w-full bg-gradient-eco hover:opacity-90"
              >
                Refazer Quiz
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-eco p-4">
      <div className="max-w-2xl mx-auto pt-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span>Questão {currentQuestion + 1} de {quizQuestions.length}</span>
              <span>Pontuação: {score}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <Card className="p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              {question.question}
            </h2>
            <p className="text-sm text-muted-foreground">
              Selecione a resposta correta
            </p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showFeedback = answeredQuestions[currentQuestion];

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answeredQuestions[currentQuestion]}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showFeedback
                      ? isCorrect
                        ? "border-primary bg-primary/10"
                        : isSelected
                        ? "border-destructive bg-destructive/10"
                        : "border-border"
                      : isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${
                    answeredQuestions[currentQuestion]
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{option}</span>
                    {showFeedback && (
                      <>
                        {isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                        {isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
