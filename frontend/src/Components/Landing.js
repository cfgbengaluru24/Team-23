import React from 'react';
import logo from '../assets/logo.jpg';
import land from '../assets/land.png'

const Landing = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#343a40',
                padding: '10px 20px',
                color: '#fff'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logo}
                        alt="Company Logo"
                        style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <span>Best Practices Foundation</span>
                </div>
                <div>
                    <a href="#home" style={{ color: '#fff', margin: '0 10px' }}>Home</a>
                    <a href="#about" style={{ color: '#fff', margin: '0 10px' }}>About</a>
                    <a href="#login" style={{ color: '#fff', margin: '0 10px' }}>Login</a>
                    <a href="#register" style={{ color: '#fff', margin: '0 10px' }}>Register</a>
                </div>
            </nav>

            <div style={{ margin: '0px auto', width: '100%' ,}}>
                <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
                    <img
                    
                        src={land}
                        alt="Slide 1"
                        style={{ width: '100%', height: '100%', }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        color: '#fff',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '10px'
                    }}>
                
                    </div>
                </div>
                </div>

            <footer style={{
                backgroundColor: '#343a40',
                color: '#fff',
                padding: '20px',
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h5 style={{textAlign:"center",fontSize:"22px"}}>Contact Info</h5>
                    <p>Helpline Number: 8047492874</p>
                    <p>1 Palmgrove Road, Victoria Layout,Bangalore - 560 047, Karnataka, India.</p>
                    <p>Email: bpfound@gmail.com</p>
                    <p>Facebook: bestpracticesfoundation</p>
                    <p>Twitter: BestPracFound</p>
                </div>
                <div>
                    <h5>FAQ</h5>
                    <div>
                        <details>
                            <summary>What types of training programs do you offer?</summary>
                            <p>We offer training in agriculture, health, education, and vocational skills.</p>
                        </details>
                        <details>
                            <summary>How can I enroll in a training program?</summary>
                            <p>You can enroll by visiting our website or contacting our helpline number.</p>
                        </details>
                        <details>
                            <summary>Are the training programs free?</summary>
                            <p>Yes, all our training programs are free for rural communities.</p>
                        </details>
                        <details>
                            <summary>Where are the training centers located?</summary>
                            <p>Our training centers are located in various rural areas across Karnataka.</p>
                        </details>
                        <details>
                            <summary>What is the duration of the training programs?</summary>
                            <p>The duration varies depending on the program, ranging from a few days to several weeks.</p>
                        </details>
                        <details>
                            <summary>Do you provide certification upon completion?</summary>
                            <p>Yes, we provide certification for all completed training programs.</p>
                        </details>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
