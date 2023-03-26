import React, {useState} from 'react'
import { Link, useNavigate, useParams,useLocation } from 'react-router-dom'
import upvoteimg from '../../assests/upvoteimg.png'
import downvoteimg from '../../assests/downvoteimg.png'
import Avatar from '../../components/Avatar/Avatar'
import './Questions.css'
import DisplayAnswer from './DisplayAnswer'
import { useDispatch, useSelector } from 'react-redux'
import {deleteQuestions, postAnswer, voteQuestion} from '../../actions/question'
import moment from 'moment'
import copy from 'copy-to-clipboard'

const QuestionDetails = () => {
    const {id} =useParams()
    const questionsList = useSelector((state) => state.questionReducer)
    // var questionsList = [{
    //     _id:'1',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:2,
    //     questionTitle :"What is a function?",
    //     questionBody:"It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted:"mano",
    //     userId:1,
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:'kumar',
    //       answeredOn:"jan2",
    //       userId:2,
    //     }]
    //   },{
    //     _id:'2',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:0,
    //     questionTitle :"What is a function?",
    //     questionBody:"It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted:"mano",
    //     userId:1,
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:'kumar',
    //       answeredOn:"jan2",
    //       userId:2,
    //     }]
    //   },{
    //     _id:'3',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:0,
    //     questionTitle :"What is a function?",
    //     questionBody:"It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted:"mano",
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:'kumar',
    //       answeredOn:"jan2",
    //       userId:2,
    //     }]
    //   }]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => (state.currentUserReducer))
    const [Answer, setAnswer] = useState('')
    const location = useLocation()
    const url = 'https://stack-overflow-p1.netlify.app/'

    const handlePostAns = (e, answerLength) => {
        e.preventDefault(); 
        if (user == null){
            alert('Login or Signup to answer the question')
            navigate('/Auth')
        }
        else{
            if (Answer === ''){
                alert('Enter the answer before submitting')
            }
            else{
                dispatch(postAnswer({id, noOfAnswers: answerLength+1, answerBody: Answer, userAnswered: user.result.name, userId: user.result._id}));
                setAnswer('')
                // window.location.reload();
            }
        }
    }
    const handleShare = () => {
        copy(url+location.pathname)
        alert('Copied url : '+ url+location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestions(id, navigate))
    }
    const handleUpVote = () => {
        dispatch(voteQuestion(id,  'upVote', user.result._id))
    }
    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', user.result._id))
    }
    
  return (
    <div className='question-details-page'>
            {
                questionsList.data === null ? 
                <h1>Loading...</h1>:
                <>
                    {
                        questionsList.data.filter(question => question._id === id).map(question =>(
                            <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className="question-votes">
                                            <img src={upvoteimg} alt="" width='18' className='votes-icon' onClick={handleUpVote} />
                                            <p> {question.upVote.length -question.downVote.length}</p>
                                            <img src={downvoteimg} alt=" " width='18' className='votes-icon' onClick={handleDownVote} />
                                        </div>
                                        <div style={{width:"100%"}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className="question-details-tags">
                                                {
                                                    question.questionTags.map((tag) =>(
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='question-actions-user'>
                                                <div>
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {
                                                        user?.result?._id === question?.userId && (
                                                            <button type='button' onClick={handleDelete}>Delete</button>
                                                        )
                                                    }
                                                    
                                                </div>
                                                <div>
                                                    <p>Asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#000868'}}>
                                                        <Avatar backgroundColor="orange" px="8px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !==0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} Answers</h3>
                                            <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Answer</h3>
                                    <form onSubmit={(e) => {handlePostAns(e, question.answer.length)}}>
                                        <textarea name="" id="" cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea><br/>
                                        <input type="submit" className="post-ans-btn" value='Post Your Answer' />
                                    </form>
                                    <p>
                                        Browse other Question tagged
                                        {
                                            question.questionTags.map((tag) =>(
                                                <Link to='/Tags' key={tag} className='ans-tags'>{tag} </Link>
                                            ))
                                        } or
                                        <Link to='/AskQuestion' style={{textDecoration:"none", color:"#009dff"}}> Ask Your Own Question</Link>
                                    </p>
                                </section>
                            </div>
                        ))
                    }
                </>
            }    
    </div>
  )
}

export default QuestionDetails