import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerChecker } from '~/src/apiService/AnswerChecker';
import { useQuestionGenerator } from '~/src/apiService/QuestionGenerator';
import PageLayout from '~/src/components/PageLayout/PageLayout';
import { QUESTION_GENERATOR_PLACEHOLDERDATA } from '~/src/constants/app';
import { NavigationRoutes } from '~/src/navigation/NavigationRoutes';
import Palette from '~/src/theme/Palette';
import { getOrSetQueryString, getOrSetSummaryText } from '~/src/utils/utils';

interface Answer {
  [key: number]: string;
}

interface Result {
  [question: string]: {
    evaluation: string;
    isCorrect: boolean;
  };
}

export default function Quiz() {
  const navigate = useNavigate();
  const summaryText = String(getOrSetSummaryText());
  
  // Quiz state management
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [results, setResults] = useState<Result>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  
  // Word count constraints
  const minWords = 5 ;
  const maxWords = 200;

  // Fetch questions based on summary text
  const { 
    data: questionData = QUESTION_GENERATOR_PLACEHOLDERDATA,
    isLoading: isQuestionsLoading,
    error: questionsError
  } = useQuestionGenerator(summaryText);

  const questions = questionData?.questions || [];

  // Handle after answer check (navigation)
  const handleAfterAnswerCheck = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setFeedback('');
    } else {
      setShowResults(true);
    }
  };

  // Answer Checker Api
  const { mutate: answerChecker } = AnswerChecker({
      onSuccess: (response) => {
        if(response){
          // Store result when API call succeeds
          const evaluation = response?.evaluation || 'Incorrect';
          setResults(prev => ({
            ...prev,
            [response.payload.question]: {
              evaluation,
              isCorrect: !(evaluation.toLowerCase().includes('incorrect') || evaluation.toLowerCase().includes('wrong') || evaluation.toLowerCase().includes('error'))
            }
          }));
        }
      },
      onError: (response) => {
        setResults(prev => ({
            ...prev,
            [response?.payload?.question]: {
              evaluation: "Error evaluating answer",
              isCorrect: false
            }
          }));
      }
    });

  // Calculate word count from text
  const getWordCount = (text: string): number => {
    return text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  };

  // Handle answer input changes
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newAnswer = event.target.value;
    setAnswers({
      ...answers,
      [currentQuestion]: newAnswer,
    });

    // Validate answer length
    const wordCount = getWordCount(newAnswer);
    if (wordCount < minWords) {
      setFeedback(`Please write at least ${minWords} words. Current: ${wordCount}`);
    } else if (wordCount > maxWords) {
      setFeedback(`Please write no more than ${maxWords} words. Current: ${wordCount}`);
    } else {
      setFeedback('');
    }
  };

  // Move to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  // Handle answer submission and moving to next question
  const handleNext = () => {
    const currentAnswer = answers[currentQuestion] || '';
    const currentQuestionText = questions[currentQuestion];
    const wordCount = getWordCount(currentAnswer);
    
    // Validate answer before proceeding
    if (wordCount < minWords || wordCount > maxWords) {
      return;
    }

    // Only check answer if not already checked
    if (!results[currentQuestion]) {
      // Set up state for answer checking API call to trigger
      answerChecker({
      question: currentQuestionText,
      answer: currentAnswer
      })
      handleAfterAnswerCheck();
      // setQuestionToCheck(currentQuestion);
      // setQuestionToCheckText(currentQuestionText);
      // setQuestionToCheckAnswer(currentAnswer);
    } else {
      // If already checked, just navigate
      handleAfterAnswerCheck();
    }
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults({});
    setShowResults(false);
    setFeedback('');
  };
  
  // Navigate to summary screen
  const handleOnClose = () => {
    navigate(
      NavigationRoutes.APP_ROUTES.SUMMARY.replace(
        ':q',
        String(getOrSetQueryString()),
      ),
    );
  };

  // Show loading state while questions are being fetched
  if (isQuestionsLoading) {
    return (
      <PageLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading quiz questions...</Typography>
        </Box>
      </PageLayout>
    );
  }

  // Show error state if questions couldn't be loaded
  if (questionsError || questions.length === 0) {
    return (
      <PageLayout>
        <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load quiz questions. Please try again later.
          </Alert>
          <Button 
            variant="contained" 
            onClick={handleOnClose}
            sx={{
              bgcolor: Palette.primary.main,
              '&:hover': { bgcolor: Palette.custom.mainHover },
            }}
          >
            <Typography color="white">Return to Summary</Typography>
          </Button>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: 2 }}>
        {!showResults ? (
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              {/* Progress Bar */}
              <LinearProgress
                variant="determinate"
                value={((currentQuestion + 1) / questions.length) * 100}
                sx={{ mb: 2, height: 8, borderRadius: 4 }}
              />

              {/* Question Counter */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                  alignItems: 'center',
                }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
                  Question {currentQuestion + 1} of {questions.length}
                </Typography>
                <Chip 
                  label={`${getWordCount(answers[currentQuestion] || '')} / ${minWords}-${maxWords} words`}
                  color={getWordCount(answers[currentQuestion] || '') >= minWords && 
                         getWordCount(answers[currentQuestion] || '') <= maxWords ? 
                         "success" : "default"}
                  variant="outlined"
                  size="small"
                />
              </Box>

              {/* Question */}
              <Paper elevation={0} sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {questions[currentQuestion]}
                </Typography>
              </Paper>

              {/* Answer Input */}
              <TextField
                multiline
                rows={8}
                fullWidth
                variant="outlined"
                value={answers[currentQuestion] || ''}
                onChange={handleAnswerChange}
                placeholder="Type your answer here..."
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  } 
                }}
              />

              {/* Feedback */}
              {feedback && (
                <Alert
                  severity={feedback.includes('more') ? 'warning' : 'error'}
                  sx={{ mt: 1, mb: 2, borderRadius: 1 }}>
                  {feedback}
                </Alert>
              )}

              {/* Result feedback for current question (if already answered) */}
              {results[currentQuestion] && (
                <Alert
                  icon={results[currentQuestion].isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                  severity={results[currentQuestion].isCorrect ? "success" : "error"}
                  sx={{ mb: 2, borderRadius: 1 }}
                >
                  {results[currentQuestion].evaluation}
                </Alert>
              )}

              {/* Navigation */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="outlined"
                  disabled={currentQuestion === 0}
                  onClick={handlePrevious}
                  startIcon={<ArrowBackIcon sx={{color: Palette.primary.main}}/>}
                  sx={{ borderRadius: 2 }}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={
                    // (isPending && (questions.length - 1) == currentQuestion) ? 
                    // <CircularProgress size={16} color="inherit" /> : 
                    <ArrowForwardIcon sx={{color: 'white'}} />}
                  disabled={
                    // (isPending && (questions.length - 1) == currentQuestion) ||
                    !answers[currentQuestion] ||
                    getWordCount(answers[currentQuestion]) < minWords ||
                    getWordCount(answers[currentQuestion]) > maxWords
                  }
                  sx={{
                    bgcolor: Palette.primary.main,
                    '&:hover': {
                      bgcolor: Palette.custom.mainHover,
                    },
                    borderRadius: 2
                  }}>
                  <Typography color={'white'}>
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  </Typography>
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Dialog
            open={showResults}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: { borderRadius: 2, maxHeight: '90vh' }
            }}
          >
            <DialogTitle sx={{ bgcolor: Palette.primary.main, color: 'white', fontWeight: 'bold' }}>
              Quiz Results
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  You've completed the quiz! Here are your results:
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {/* Summary stats */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {questions.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Questions
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {Object.values(results).filter(r => r?.isCorrect).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Correct Answers
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="error.main">
                      {Object.values(results).filter(r => !r?.isCorrect).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Incorrect Answers
                    </Typography>
                  </Box>
                </Box>

                {/* Detailed results for each question */}
                {questions.map((question, index) => (
                  <Paper key={index} sx={{ mb: 3, p: 2, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Question {index + 1}:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {question}
                    </Typography>
                    
                    <Box sx={{ 
                      mb: 2, 
                      p: 2, 
                      bgcolor: '#f8f8f8', 
                      borderRadius: 1, 
                      border: '1px dashed #ddd' 
                    }}>
                      <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                        Your Answer ({getWordCount(answers[index] || '')} words):
                      </Typography>
                      <Typography variant="body1">
                        {answers[index] || 'No answer provided'}
                      </Typography>
                    </Box>
                    
                    {results[question] ? (
                      <Alert 
                        severity={results[question].isCorrect ? "success" : "error"}
                        icon={results[question].isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                      >
                        <Typography variant="body2">
                          {results[question].evaluation}
                        </Typography>
                      </Alert>
                    ) : (
                    <Alert severity="warning">
                      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: 'space-evenly' }}>
                        <Box>
                          <AlertTitle>
                            Evaluating Your Answer 
                            <CircularProgress sx={{ml: '10px'}} size={20} color="inherit" />
                          </AlertTitle>
                          Please wait while we analyze your response for accuracy and completeness.
                        </Box>
                        <Box >
                        </Box>
                      </Box>
                    </Alert>
                    )}
                  </Paper>
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                variant="outlined"
                onClick={handleOnClose}
                startIcon={<CloseIcon />}
                sx={{ borderRadius: 2 }}
              >
                Exit Quiz
              </Button>
              <Button
                variant="contained"
                onClick={handleRestartQuiz}
                startIcon={<ArrowForwardIcon sx={{color: 'white'}}/>}
                sx={{
                  bgcolor: Palette.primary.main,
                  '&:hover': {
                    bgcolor: Palette.custom.mainHover,
                  },
                  borderRadius: 2
                }}
              >
                <Typography color="white">Restart Quiz</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </PageLayout>
  );
}
