var pos = 0, t,test, test_status, question,  choices, chA, chB, chC, correct = 0;
var questions = [
    [ "What is 10 + 4?", "12", "14", "16", "B" ],
	[ "What is 20 - 9?", "7", "13", "11", "C" ],
	[ "What is 7 x 3?", "21", "24", "25", "A" ],
	[ "What is 8 / 2?", "10", "2", "4", "C" ]
];

function _(x)
{
	return document.getElementById(x);
}

function renderQuestion()
{

	test = _("test").childNodes[1];
	if(pos >= questions.length){
		test.innerHTML = `<h2> النتيجة النهائية  ${correct} من ${questions.length} </h2>`;
		_("title").innerHTML = "Test Completed";
		_("test").childNodes[2].innerHTML="";
		clearInterval(t);
		pos = 0;
		correct = 0;
		return false;
	}
	let o = pos+1;
	let l = questions.length;
	_("title").innerHTML =`السؤال رقم ${o} من أصل ${l}`;
	question = questions[pos][0];
	chA = questions[pos][1];
	chB = questions[pos][2];
	chC = questions[pos][3];
	test.innerHTML = "<span class='question'>"+question+"</span>";
	test.innerHTML += "<label><input  type='radio' name='choices' value='A'>"+chA+"</label>";
	test.innerHTML += "<label><input  type='radio' name='choices' value='B'>"+chB+"</label>";
	test.innerHTML += "<label><input  type='radio' name='choices' value='C'>"+chC+"</label>";
    lstBorder();
   
}
function lstColor()
{
	let ans = checkAnswer();
	if (ans == -1)
	{
		_("li"+(pos+1)).style.backgroundColor="#ffffff";
    }
	else
	{
		_("li"+(pos+1)).style.backgroundColor="rgb(219, 164, 141)";

	}
}
function lstBorder()
{
	let li =_("list").childNodes;
	let i = 0 ;
	while(i < li.length)
	{
		li[i].style.borderColor="#000000";
		i++;
	}
	_("li"+(pos+1)).style.borderColor="#6E85B7";
}
function next()
{
	if(pos<=questions.length)
    {
	  lstColor();
      pos++;
	  renderQuestion();
	  _("pre").style.cursor="pointer";
	  if(pos+1>=questions.length)
	  {
		_("next").innerHTML="إنهاء";
		return;
      }
	}
	
}

function previous()
{
	if (pos > 0)
	{
		lstColor();
        pos--;		
		_("next").innerHTML="التالي";
		renderQuestion();
		if (pos == 0)
		{
			_("pre").style.cursor="not-allowed";
			return;
		}
	}
}
function viewQuestion(i)
{
	lstColor();
	pos=i-1;
	renderQuestion();
}
function checkAnswer(){
	choices = document.getElementsByName("choices");
	let choice;
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
		}
	}
	if (choice == undefined)
	{
		return -1;
	}
	else if(choice == questions[pos][4]){
		correct++;
		
	}
	return 1;
	
}

function renderList ()
{
	
	let i = 1 ;
	while (i<=questions.length)
	{
		_("list").innerHTML+=`<div id='li${i}' onclick='viewQuestion(${i});'>`+i+`</div>`;
        i++;
	}
}





function startTimer(){
var m = 0;
var s = 0;
var mlimit = 5;
var slimit = 10;
 t = window.setInterval(function(){
	if (m==mlimit)
	{
     if (s==slimit)
	 {
		clearInterval(t);
	 }
	}
		s+=1;
		if (s==60)
		{
			s=0;
			m+=1;
		}
	
 _("test").childNodes[0].innerHTML=`<span>${m}:${s}</span>`;

}
 ,1000);
 }
function startPage()
{

	_("test").childNodes[1].innerHTML=`<div><img src="java.jpg"><p>اختبار جافا القياسي هو اختبار في أساسيات لغة 
	جافا يعتمد على الاخيتار المتعدد.
		 <ul><li>يوجد 20 سؤال 
			 <li>يوجد اجابة واحده صحيحة
			 <li>مدة الاختبار 10 دقائق
			 <li>اضغط زر بدأ لبدأ الاختبار
			 </ul>
			 </p></div>`;
    _("test").childNodes[2].innerHTML=`<button class="button" onclick="startup()">ابدأ</button>`;
				
}
function startup()
{
	renderList();
	renderQuestion();
	startTimer();
	_("test").childNodes[2].innerHTML = "<button id='next' class='button' onclick='next()'><span> &rArr; التالي </span></button><button id='pre' class='button' onclick='previous()'><span> السابق &lArr;</span></button>";

}
window.addEventListener("load",startPage);
