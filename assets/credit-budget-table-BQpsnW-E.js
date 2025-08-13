import{j as t,e as I,o as S}from"./index-akJh1a2u.js";import{r as d}from"./vendor-core-CiUIJZ_7.js";import{TableActions as D}from"./table-actions-ySQM_hI3.js";import{F as h,M as R,I as M,B as g}from"./vendor-ui-DnFwFa5O.js";import"./vendor-utils-IiNHtr66.js";const c={base:"inline-flex w-full items-center align-middle rounded-md px-2 py-1 text-sm transition-all bg-transparent duration-300 ease-in-out text-text-secondary! ",hover:"hover:bg-action-hover!",active:"bg-primary/hover! hover:bg-primary/focus! text-primary!"},U=S(c.base,c.hover,"min-h-[44px]",c.active);function z({onEdit:n,data:b,openCreateModalCredit:f}){const[y,p]=d.useState(!1),[m,u]=d.useState(null),[r,o]=d.useState(""),[a,i]=d.useState(null),C=[{creditNumber:"CRD001",creditDate:"1404/04/01",amount:5e6,assigningUnit:"یگان الف"},{creditNumber:"CRD002",creditDate:"1404/04/15",amount:75e5,assigningUnit:"یگان ب"}].filter(e=>r?a?e[a]?.toString().toLowerCase().includes(r.toLowerCase()):Object.values(e).some(N=>N.toString().toLowerCase().includes(r.toLowerCase())):!0),k=e=>{u(e),p(!0),o(""),i(null)},w=()=>{p(!1),u(null),o(""),i(null)},s=e=>{i(e)},j=()=>{o(""),i(null)},x=[{title:t.jsx("span",{className:"cursor-pointer hover:text-blue-500",onClick:()=>s("creditNumber"),children:"شماره اعتبار"}),dataIndex:"creditNumber",key:"creditNumber"},{title:t.jsx("span",{className:"cursor-pointer hover:text-blue-500",onClick:()=>s("creditDate"),children:"تاریخ اعتبار"}),dataIndex:"creditDate",key:"creditDate"},{title:t.jsx("span",{className:"cursor-pointer hover:text-blue-500",onClick:()=>s("amount"),children:"مبلغ"}),dataIndex:"amount",key:"amount",render:e=>`${e.toLocaleString()} ریال`},{title:t.jsx("span",{className:"cursor-pointer hover:text-blue-500",onClick:()=>s("assigningUnit"),children:"یگان واگزار کننده"}),dataIndex:"assigningUnit",key:"assigningUnit"}],v=[{title:"ردیف",dataIndex:"id",key:"id"},{title:t.jsx("span",{className:U,children:"برنامه"}),dataIndex:"program",key:"program"},{title:"شرح برنامه",dataIndex:"barnameID",key:"barnameID"},{title:"شرح فعالیت",dataIndex:"faaliatID",key:"faaliatID"},{title:"ماده",dataIndex:"madeh",key:"madeh"},{title:"شرح هزینه",dataIndex:"payment_description",key:"payment_description"},{title:"عملیات",key:"actions",render:(e,l)=>t.jsxs("div",{className:"flex gap-2 items-center",children:[t.jsx(D,{record:l,onRefresh:()=>{},openCreateModalCredit:()=>f(),onEdit:()=>n(l)}),t.jsx(g,{className:"bg-background border rounded-2xl text-primary py-1 px-2 text-xs cursor-pointer",onClick:()=>k(l),children:"نمایش اعتبارات"})]})}];return t.jsxs(I,{children:[t.jsx(h,{rowSelection:{type:"checkbox"},columns:v,dataSource:b,rowKey:"id"}),t.jsxs(R,{title:t.jsxs("div",{className:"p-6 bg-gray-50 rounded-t-lg shadow-sm px-12",children:[t.jsx("h3",{className:"text-xl font-bold text-gray-800",children:"جزئیات ردیف"}),m&&t.jsxs("div",{className:"mt-4 grid grid-cols-1 md:grid-cols-2 gap-4",children:[t.jsxs("p",{className:"text-gray-700",children:[t.jsx("strong",{className:"font-semibold",children:"برنامه:"})," ",m.program]}),t.jsxs("p",{className:"text-gray-700",children:[t.jsx("strong",{className:"font-semibold",children:"شرح هزینه:"})," ",m.payment_description]})]})]}),open:y,onCancel:w,footer:null,className:"modal-slide-up",styles:{content:{padding:0,background:"#fff",borderRadius:"16px 16px 0 0"},body:{padding:"24px"}},children:[t.jsxs("div",{className:"mb-4 flex items-center gap-4",children:[t.jsx(M,{placeholder:a?`جستجو در ${x.find(e=>e.key===a)?.title?.props?.children||a}...`:"جستجو در اعتبارات...",value:r,onChange:e=>o(e.target.value),className:"w-full max-w-md",allowClear:!0}),t.jsx(g,{onClick:j,children:"ریست جستجو"})]}),t.jsx(h,{columns:x,dataSource:C,rowKey:"creditNumber",pagination:!1,className:"ant-table-custom"})]})]})}const L=`
  .modal-slide-up{
    width:90vw !important;

  }
  .modal-slide-up .ant-modal {
    top: 0 ;
    bottom: 0 !important;
    margin: 0 !important;
    width: 95% !important;
    max-width: 1400px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-bottom: 0 !important;
  }

  .modal-slide-up .ant-modal-content {
    border-radius: 16px 16px 0 0 !important;
    overflow: hidden;
    transform: translateY(100%);
    animation: slideUp 0.3s ease-out forwards;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .modal-slide-up .ant-modal-mask {
    background: rgba(0, 0, 0, 0.6) !important;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .modal-slide-up .ant-modal-close {
    top: 16px !important;
    right: 16px !important;
    color: #000 !important;
    font-size: 16px !important;
  }

  .modal-slide-up .ant-modal-close-x {
    width: 40px !important;
    height: 40px !important;
    line-height: 40px !important;
    font-size: 18px !important;
    color: #555 !important;
  }

  .ant-table-custom .ant-table-thead > tr > th {
    background: #f8f9fa !important;
    font-weight: 600 !important;
    color: #333 !important;
    padding: 12px 16px !important;
    text-align: right !important;
    transition: background 0.2s ease;
  }

  .ant-table-custom .ant-table-thead > tr > th:hover {
    background: #e6f7ff !important;
  }

  .ant-table-custom .ant-table-tbody > tr > td {
    padding: 12px 16px !important;
    text-align: right !important;
  }

  @media (max-width: 768px) {
    .modal-slide-up .ant-modal {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
    }
  }
`;if(typeof document<"u"){const n=document.createElement("style");n.innerHTML=L,document.head.appendChild(n)}export{z as default};
