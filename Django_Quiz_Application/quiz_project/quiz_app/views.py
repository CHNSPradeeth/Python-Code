from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Quiz, Question, Choice, QuizAttempt

def quiz_list(request):
    quizzes = Quiz.objects.all()
    return render(request, 'quiz_app/quiz_list.html', {'quizzes': quizzes})

@login_required
def take_quiz(request, quiz_id):
    quiz = get_object_or_404(Quiz, pk=quiz_id)
    if request.method == 'POST':
        score = 0
        for question in quiz.questions.all():
            selected_choice_id = request.POST.get(f'question_{question.id}')
            if selected_choice_id:
                selected_choice = Choice.objects.get(pk=selected_choice_id)
                if selected_choice.is_correct:
                    score += 1
        
        QuizAttempt.objects.create(user=request.user, quiz=quiz, score=score)
        return redirect('quiz_result', quiz_id=quiz.id)
    else:
        questions = quiz.questions.all()
        return render(request, 'quiz_app/take_quiz.html', {'quiz': quiz, 'questions': questions})

@login_required
def quiz_result(request, quiz_id):
    quiz = get_object_or_404(Quiz, pk=quiz_id)
    attempt = QuizAttempt.objects.filter(user=request.user, quiz=quiz).latest('completed_at')
    return render(request, 'quiz_app/quiz_result.html', {'quiz': quiz, 'attempt': attempt})