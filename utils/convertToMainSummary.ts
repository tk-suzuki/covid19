const current_patients = require('@/data/current_patients.json');//現在患者増減
const patients_summary = require('@/data/patients_summary.json');//これまでの陽性患者数
const discharges_summary = require('@/data/discharges_summary.json');//治療終了者
const inspections = require('@/data/inspections.json');//検査数

export default () => {
  var sum  = function(arr:any) {
    return arr.reduce(function(prev:number, current:number, i:number, arr:any) {
      return prev+current;
    });
  };
  const currentPatients = current_patients['data'];
  const patientssubtotal = currentPatients.map((data:any) => parseInt(data.subtotal)).filter(Boolean);
  const patientsdates = currentPatients.map((data:any) => data.date).filter(Boolean);
  const milds = currentPatients.map((data:any) => parseInt(data.軽症中等症)).filter(Boolean);
  const serious = currentPatients.map((data:any) => parseInt(data.重症)).filter(Boolean);
  const losts = currentPatients.map((data:any) => parseInt(data.死亡)).filter(Boolean);
  const inspections_a = inspections['data'];
  const inspections_b = inspections_a.map((data:any) => parseInt(data.subtotal)).filter(Boolean);
  const discharges_a = discharges_summary['data'];
  const discharges = discharges_a.map((data:any) => parseInt(data.subtotal)).filter(Boolean);
  const patients_a = patients_summary['data'];
  const patients = patients_a.map((data:any) => parseInt(data.subtotal)).filter(Boolean);
  const patients_summary_dates = patients_a.map((data:any) => data.date).filter(Boolean);

  const patients_sum = sum(patientssubtotal);
  const mild_sum = sum(milds);
  const serious_sum = sum(serious);
  const losts_sum = sum(losts);
  const inspection_sum = sum(inspections_b);
  const discharges_sum = sum(discharges);
  var patients_summary_sum = sum(patients);

  if(patientsdates.pop() !== patients_summary_dates.pop()){
    patients_summary_sum = patients_summary_sum - patients.pop()
  }

  const main_summary = {
    'nowpatients': patients_sum,
    'milds' : mild_sum,
    'serious': serious_sum,
    'losts': losts_sum,
    'discharges': discharges_sum,
    'inspections': inspection_sum,
    'currentpatients': patients_summary_sum
  };

  return main_summary;
}
