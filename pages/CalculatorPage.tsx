
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';
import { CALCULATOR_CATEGORIES, POPULAR_TOOLS } from '../constants';
import IdealWeightCalculator from '../components/calculators/IdealWeightCalculator';
import ExchangeRateCalculator from '../components/calculators/ExchangeRateCalculator';
import DutchPayCalculator from '../components/calculators/DutchPayCalculator';
import LengthConverter from '../components/calculators/LengthConverter';
import WeightConverter from '../components/calculators/WeightConverter';
import TemperatureConverter from '../components/calculators/TemperatureConverter';
import AreaConverter from '../components/calculators/AreaConverter';
import VolumeConverter from '../components/calculators/VolumeConverter';
import TimeConverter from '../components/calculators/TimeConverter';
import InterestCalculator from '../components/calculators/InterestCalculator';
import LoanCalculator from '../components/calculators/LoanCalculator';
import SalaryCalculator from '../components/calculators/SalaryCalculator';
import DdayCalculator from '../components/calculators/DdayCalculator';
import DiscountCalculator from '../components/calculators/DiscountCalculator';
import GradeCalculator from '../components/calculators/GradeCalculator';
import AverageCalculator from '../components/calculators/AverageCalculator';
import RetirementCalculator from '../components/calculators/RetirementCalculator';
import InvestmentCalculator from '../components/calculators/InvestmentCalculator';
import CommissionCalculator from '../components/calculators/CommissionCalculator';
import AcquisitionTaxCalculator from '../components/calculators/AcquisitionTaxCalculator';
import CapitalGainsTaxCalculator from '../components/calculators/CapitalGainsTaxCalculator';
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import GPAConverter from '../components/calculators/GPAConverter';
import DataStorageConverter from '../components/calculators/DataStorageConverter';
import TipCalculator from '../components/calculators/TipCalculator';
import MetabolismCalculator from '../components/calculators/MetabolismCalculator';
import PercentageCalculator from '../components/calculators/PercentageCalculator';
import SpeedConverter from '../components/calculators/SpeedConverter';
import EnergyConverter from '../components/calculators/EnergyConverter';
import PressureConverter from '../components/calculators/PressureConverter';
import AngleConverter from '../components/calculators/AngleConverter';
import ForceConverter from '../components/calculators/ForceConverter';
import PowerConverter from '../components/calculators/PowerConverter';
import FrequencyConverter from '../components/calculators/FrequencyConverter';
import SavingsCalculator from '../components/calculators/SavingsCalculator';
import CompoundInterestCalculator from '../components/calculators/CompoundInterestCalculator';
import AnnuityCalculator from '../components/calculators/AnnuityCalculator';
import VATCalculator from '../components/calculators/VATCalculator';
import YearEndTaxCalculator from '../components/calculators/YearEndTaxCalculator';
import IncomeTaxCalculator from '../components/calculators/IncomeTaxCalculator';
import FinancialGoalCalculator from '../components/calculators/FinancialGoalCalculator';
import InstallmentCalculator from '../components/calculators/InstallmentCalculator';
import HolidayAllowanceCalculator from '../components/calculators/HolidayAllowanceCalculator';
import ComprehensiveTaxCalculator from '../components/calculators/ComprehensiveTaxCalculator';
import PropertyTaxCalculator from '../components/calculators/PropertyTaxCalculator';
import InheritanceTaxCalculator from '../components/calculators/InheritanceTaxCalculator';
import GiftTaxCalculator from '../components/calculators/GiftTaxCalculator';
import JeonseLoanCalculator from '../components/calculators/JeonseLoanCalculator';
import RentalYieldCalculator from '../components/calculators/RentalYieldCalculator';
import RentConversionCalculator from '../components/calculators/RentConversionCalculator';
import AnniversaryCalculator from '../components/calculators/AnniversaryCalculator';
import Timer from '../components/calculators/Timer';
import Stopwatch from '../components/calculators/Stopwatch';
import WorldClock from '../components/calculators/WorldClock';
import BodyFatCalculator from '../components/calculators/BodyFatCalculator';
import SleepScoreCalculator from '../components/calculators/SleepScoreCalculator';
import StressLevelCalculator from '../components/calculators/StressLevelCalculator';
import HealthRiskCalculator from '../components/calculators/HealthRiskCalculator';
import BiologicalAgeCalculator from '../components/calculators/BiologicalAgeCalculator';
import VisceralFatCalculator from '../components/calculators/VisceralFatCalculator';
import WaterIntakeCalculator from '../components/calculators/WaterIntakeCalculator';
import VO2MaxCalculator from '../components/calculators/VO2MaxCalculator';
import GradeConverter from '../components/calculators/GradeConverter';
import GradePredictor from '../components/calculators/GradePredictor';

interface CalculatorPageProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addRecent: (id: string) => void;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ favorites, toggleFavorite, addRecent }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
        addRecent(id);
    }
  }, [id, addRecent]);

  const allTools = [...CALCULATOR_CATEGORIES.flatMap(c => c.tools), ...POPULAR_TOOLS];
  const calculator = allTools.find(t => t.id === id);

  if (!calculator || !id) {
    return (
      <div className="p-4 md:p-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600">
          <ChevronLeft /> 뒤로가기
        </button>
        <div className="text-center mt-10">Calculator not found</div>
      </div>
    );
  }
  
  const isFavorite = favorites.includes(id);

  const renderCalculator = () => {
    switch (id) {
      // Unit Converters
      case 'length': return <LengthConverter />;
      case 'weight': return <WeightConverter />;
      case 'volume': return <VolumeConverter />;
      case 'area': return <AreaConverter />;
      case 'temperature': return <TemperatureConverter />;
      case 'time': return <TimeConverter />;
      case 'data-storage': return <DataStorageConverter />;
      case 'speed': return <SpeedConverter />;
      case 'energy': return <EnergyConverter />;
      case 'pressure': return <PressureConverter />;
      case 'angle': return <AngleConverter />;
      case 'force': return <ForceConverter />;
      case 'power': return <PowerConverter />;
      case 'frequency': return <FrequencyConverter />;
      
      // Finance Calculators
      case 'exchange': return <ExchangeRateCalculator />;
      case 'interest': return <InterestCalculator />;
      case 'loan': return <LoanCalculator />;
      case 'salary': return <SalaryCalculator />;
      case 'retirement': return <RetirementCalculator />;
      case 'investment': return <InvestmentCalculator />;
      case 'savings': return <SavingsCalculator />;
      case 'compound-interest': return <CompoundInterestCalculator />;
      case 'annuity': return <AnnuityCalculator />;
      case 'vat': return <VATCalculator />;
      case 'year-end-tax': return <YearEndTaxCalculator />;
      case 'income-tax': return <IncomeTaxCalculator />;
      case 'financial-goal': return <FinancialGoalCalculator />;
      case 'installment': return <InstallmentCalculator />;
      case 'holiday-allowance': return <HolidayAllowanceCalculator />;
      
      // Real Estate Calculators
      case 'commission': return <CommissionCalculator />;
      case 'acquisition-tax': return <AcquisitionTaxCalculator />;
      case 'capital-gains-tax': return <CapitalGainsTaxCalculator />;
      case 'mortgage': return <MortgageCalculator />;
      case 'comprehensive-tax': return <ComprehensiveTaxCalculator />;
      case 'property-tax': return <PropertyTaxCalculator />;
      case 'inheritance-tax': return <InheritanceTaxCalculator />;
      case 'gift-tax': return <GiftTaxCalculator />;
      case 'jeonse-loan': return <JeonseLoanCalculator />;
      case 'rental-yield': return <RentalYieldCalculator />;
      case 'rent-conversion': return <RentConversionCalculator />;

      // Lifestyle Calculators
      case 'dutch-pay': return <DutchPayCalculator />;
      case 'd-day': return <DdayCalculator />;
      case 'discount': return <DiscountCalculator />;
      case 'tip': return <TipCalculator />;
      case 'anniversary': return <AnniversaryCalculator />;
      case 'timer': return <Timer />;
      case 'stopwatch': return <Stopwatch />;
      case 'world-clock': return <WorldClock />;
      
      // Health Calculators
      case 'bmi': return <IdealWeightCalculator />;
      case 'calorie': return <MetabolismCalculator />;
      case 'body-fat': return <BodyFatCalculator />;
      case 'visceral-fat': return <VisceralFatCalculator />;
      case 'water-intake': return <WaterIntakeCalculator />;
      case 'vo2-max': return <VO2MaxCalculator />;
      case 'sleep-score': return <SleepScoreCalculator />;
      case 'stress-level': return <StressLevelCalculator />;
      case 'health-risk': return <HealthRiskCalculator />;
      case 'biological-age': return <BiologicalAgeCalculator />;

      // Education Calculators
      case 'grade': return <GradeCalculator />;
      case 'average': return <AverageCalculator />;
      case 'gpa': return <GPAConverter />;
      case 'percentage': return <PercentageCalculator />;
      case 'grade-converter': return <GradeConverter />;
      case 'grade-predictor': return <GradePredictor />;

      default:
        return <div className="p-4 md:p-6 text-center">계산기 기능이 아직 구현되지 않았습니다.</div>;
    }
  };
  
  // Use popular tool name if it exists (e.g., '환율 계산기' vs '환율')
  const popularTool = POPULAR_TOOLS.find(t => t.id === id);
  let calculatorName = `${calculator.name} 계산기`;
  const converterIds = [
      'length', 'weight', 'temperature', 'area', 'volume', 'time', 'gpa', 'data-storage',
      'speed', 'energy', 'pressure', 'angle', 'force', 'power', 'frequency', 'grade-converter'
  ];
  if (popularTool) {
      calculatorName = popularTool.name;
  } else if (converterIds.includes(id)) {
      calculatorName = `${calculator.name} 변환기`;
  }


  return (
    <div>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 md:px-6 flex justify-between items-center border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft />
        </button>
        <h1 className="text-lg font-bold text-gray-800">{calculatorName}</h1>
        <div className="flex items-center">
          <button onClick={() => toggleFavorite(id)} className="p-2">
            <Star className={isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-500'} />
          </button>
        </div>
      </header>
      <main className="p-4 md:p-6">
        {renderCalculator()}
      </main>
    </div>
  );
};

export default CalculatorPage;
