import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = 'http://localhost:8000/api/v1/media'

const LectureTab = () => {

    const [lectureTitle, setLectureTitle] = useState('');
    const [videoInfo, setVideoInfo] = useState(null)
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgess, setUploadProgess] = useState(0)
    const [btnDisable, setBtnDisable] = useState(false)

    const params = useParams()
    const {courseId, lectureId} = params

    const [editLecture, {data, isLoading, error, isSuccess}] = useEditLectureMutation()
    const [removeLecture, {data:removeData, isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation()
    const {data:lectureData} = useGetLectureByIdQuery(lectureId)

    const lecture = lectureData?.lecture

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0]
        if(file) {
            const formData = new FormData()
            formData.append('file', file)
            setMediaProgress(true)
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData,{
                    onUploadProgress:({loaded, total}) => {
                        setUploadProgess(Math.round((loaded*100)/total))
                    }
                })
                if(res.data.success) {
                    console.log(res)
                    setVideoInfo({videoUrl: res.data.data.url, publicId:res.data.data.publicId})
                    setBtnDisable(false);
                    toast.success(res.data.message)
                }
    
            } catch (error) {
                toast.error('video upload failed')
            } finally {
                setMediaProgress(false)
                setUploadProgess(0)
            }
        }
    }

    const editLectureHandler = async () => {
        try {
            await editLecture({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }).unwrap()
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update lecture")
        }
    }


    const removeLectureHandler = async() => {
        await removeLecture(lectureId)
    }

    useEffect(() => {
        if(lecture) {
            setLectureTitle(lecture.lectureTitle)
            setIsPreviewFree(lecture.isPreviewFree)
            setVideoInfo({
                videoUrl: lecture.videoUrl,
                publicId: lecture.publicId
            })
        }
    }, [lecture])

    useEffect(() => {
        if(isSuccess)
            toast.success(data.message);
        if(error)
            toast.error(error.message)
    }, [isSuccess, error])

    useEffect(() => {
        if(removeSuccess)
            toast.success(removeData.message)
    }, [removeSuccess])

  return (
    <Card>
        <CardHeader className='flex justify-between'>
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription>
                    Make changes and click save when done
                </CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button disabled={removeLoading} variant='destructive' onClick={removeLectureHandler} >
                    {removeLoading ? <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </> : 'Remove Lecture'}
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div>
                <Label>Title</Label>
                <Input 
                    value={lectureTitle}
                    onChange={e => setLectureTitle(e.target.value)}
                    type='text'
                    placeholder='Ex. Introduction to JavaScript'
                />
            </div>
            <div className='my-5'>
                <Label>Video <span className='text-red-500'>*</span></Label>
                <Input 
                    type='file'
                    onChange={fileChangeHandler}
                    accept='video/*'
                    className='w-fit'
                />
                {videoInfo?.videoUrl && (
      <div className="mt-4">
          <Label>Preview:</Label>
          <video 
              src={videoInfo.videoUrl} 
              controls 
              className="mt-2 w-full max-w-md rounded-lg border"
          />
      </div>
  )}
            </div>

            {mediaProgress && (
                <div className='my-4'>
                    <Progress value={uploadProgess} />
                    <p>{uploadProgess}% uploaded</p>
                </div>
            )}

            <div className='flex items-center space-x-2 my-5'>
                <Switch
                    id="free-video"
                    checked={isPreviewFree}
                    onCheckedChange={setIsPreviewFree}
                />

                <Label htmlFor="free-video">Is this video FREE?</Label>
            </div>

            <div className='mt-4'>
                <Button onClick={editLectureHandler} disabled={isLoading || btnDisable}>
                    {isLoading ? <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </> : 'Update Lecture'}
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default LectureTab