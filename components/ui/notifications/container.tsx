export default function NotificationContainer (
  {children, show}
  :{
    children: React.ReactNode;
    show: boolean;
  }
) {
  return (
    <div className={`absolute z-10 transition-all ${show ? 'right-0 sm:right-2' : '-right-[120%]'} p-2 sm:rounded top-[80px] w-full sm:min-w-[340px] sm:max-w-[340px] min-h-[300px] max-h-[300px] bg-violet-900 overflow-x-hidden overflow-y-auto flex flex-col gap-y-2`} id="modified-scrollbar">
        {children}
        <style jsx>
          {`
            #modified-scrollbar{
              scrollbar-width: 10px;
              scrollbar-color: rgb(46 16 101) transparent;
            }
          `}
        </style>
      </div>
  )
}