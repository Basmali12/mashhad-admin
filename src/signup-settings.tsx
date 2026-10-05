import {useState,type FormEvent} from 'react';
import {useMutation,useQuery} from 'convex/react';
import {anyApi} from 'convex/server';
export function SignupSettings(){
 const config=useQuery(anyApi.onboarding.settings) as {points:number}|undefined;
 return config?<Editor key={config.points} points={config.points}/>:<p>جارٍ تحميل إعداد الحسابات الجديدة…</p>;
}
function Editor({points}:{points:number}){
 const save=useMutation(anyApi.onboarding.save),[value,setValue]=useState(String(points)),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 async function submit(e:FormEvent){e.preventDefault();if(busy)return;setBusy(true);try{await save({points:Number(value)});setMessage('تم حفظ رصيد الحسابات الجديدة. الحسابات السابقة لا تتغير.')}catch(e){setMessage(e instanceof Error?e.message:'تعذر الحفظ')}finally{setBusy(false)}}
 return <section className="panel"><h2>نقاط الحساب الجديد</h2><p>يدخل الزبون إلى الرئيسية فور التسجيل، ويحصل على هذا الرصيد مرة واحدة. لا يعاد شحنه عند تسجيل الدخول مجددًا.</p><form onSubmit={submit}><label>الرصيد التجريبي بالنقاط<input type="number" dir="ltr" required min="0" max="1000000" step="1" value={value} disabled={busy} onChange={e=>setValue(e.target.value)}/></label><small>مثلاً 6 أو 10 أو 12. القيمة 0 توقف النقاط التجريبية، دون منع دخول الحساب الجديد.</small><button disabled={busy}>{busy?'جارٍ الحفظ…':'حفظ نقاط الحساب الجديد'}</button></form>{message&&<p role="status" className="notice">{message}</p>}</section>;
}
