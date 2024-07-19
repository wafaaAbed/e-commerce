import GridList from '@Components/Common/GridList/GridList'
import Heading from '@Components/Common/Haeding/Heading'
import { Category } from '@Components/e-Commerce';
import Loading from '@Components/feedback/Loading/Loading';
import { actGetCategories, categoryCleanup } from "@store/categories/categorySlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

export default function Categories() {
  const dispatch = useAppDispatch();
  const { loading,error,records } = useAppSelector((state) => state.category)


  useEffect(() => {

    const promise = dispatch(actGetCategories())

    return () => {
      promise.abort()
      dispatch(categoryCleanup())
    }
  }, [dispatch])

  return (
    <>
      <Heading title='Categories' />
      <Loading status={loading} error={error} type="category">
      <GridList emptyMessage="There are no Categories" 
      records={records} renderItem={(record) => <Category {...record} />} />
      </Loading>
    </>
  )
}
