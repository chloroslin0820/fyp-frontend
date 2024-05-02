import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { Step, StepLabel, StepIconProps, Typography } from '@mui/material';
import { grey, orange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';

type Props =  {
    stepTarget?: number;
}

const steps = ['カート', 'ご注文手続き', '完了'];

export const ShoppingCartStepper = ({ stepTarget = 0 }: Props) => {
    const [activeStep, setActiveStep]
        = useState(stepTarget);
    const [completed, setCompleted]
        = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if(!stepTarget){
            stepTarget += 1;
        }
        if (stepTarget > activeStep) {
            const newCompleted = { ...completed };
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);

            const nextStep = activeStep + 1;
            if (nextStep < steps.length) {
                setActiveStep(nextStep);
            }
        }
    }, [stepTarget, activeStep]);

    const CustomStepIcon = styled((props: StepIconProps) => {
        const { icon } = props;
        const isCompleted = completed[icon as number - 1];

        const iconBoxStyles = {
            color: isCompleted ? 'white' : 'white',
            border: `1px solid ${isCompleted ? orange[500] : grey[600]}`,
            backgroundColor: isCompleted ? orange[500] : 'transparent',
            width: '24px',
            height: '24px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }

        return (
            <Box sx={iconBoxStyles}>
                {icon}
            </Box>
        );
    })({});

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={index} completed={completed[index]}>
                        <StepLabel StepIconComponent={() => <CustomStepIcon icon={index + 1} />}>
                            <Typography color='orangered' sx={{ textShadow: '1px 1px black' }}>{label}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};